const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const appRoutes = require('./routes/applications');
const deploymentRoutes = require('./routes/deployments');
const domainRoutes = require('./routes/domains');
const activityRoutes = require('./routes/activity');
const billingRoutes = require('./routes/billing');
const adminRoutes = require('./routes/admin');
const webhookRoutes = require('./routes/webhooks');

const { initializeDatabase } = require('./database/init');
const { authenticateToken } = require('./middleware/auth');
const { setupSocketHandlers } = require('./services/socketService');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? [`https://${process.env.DOMAIN}`, `https://www.${process.env.DOMAIN}`]
      : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [`https://${process.env.DOMAIN}`, `https://www.${process.env.DOMAIN}`]
    : "http://localhost:5173",
  credentials: true
}));

// Body parsing middleware
app.use('/api/webhooks', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined'));

// Initialize database
initializeDatabase();

// Setup Socket.IO
setupSocketHandlers(io);

// Make io available to routes
app.set('io', io);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/applications', authenticateToken, appRoutes);
app.use('/api/deployments', authenticateToken, deploymentRoutes);
app.use('/api/domains', authenticateToken, domainRoutes);
app.use('/api/activity', authenticateToken, activityRoutes);
app.use('/api/billing', authenticateToken, billingRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);
app.use('/api/webhooks', webhookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Orbit Technology API Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Domain: ${process.env.DOMAIN}`);
});

module.exports = { app, server, io };