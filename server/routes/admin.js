const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../database/init');
const { requireAdmin } = require('../middleware/auth');
const { logActivity } = require('../services/activityService');

const router = express.Router();

// Apply admin middleware to all routes
router.use(requireAdmin);

// Security: Remove sensitive environment variables from responses
const sanitizeEnvVars = (envVars) => {
  const sensitive = ['PASSWORD', 'SECRET', 'KEY', 'TOKEN', 'DATABASE_URL', 'STRIPE', 'CLERK'];
  const sanitized = {};
  
  Object.keys(envVars).forEach(key => {
    if (sensitive.some(s => key.toUpperCase().includes(s))) {
      sanitized[key] = '***HIDDEN***';
    } else {
      sanitized[key] = envVars[key];
    }
  });
  
  return sanitized;
};

// Get dashboard stats
router.get('/stats', (req, res) => {
  try {
    const db = getDatabase();
    
    const stats = {
      totalUsers: db.prepare('SELECT COUNT(*) as count FROM users').get().count,
      totalApplications: db.prepare('SELECT COUNT(*) as count FROM applications').get().count,
      totalDeployments: db.prepare('SELECT COUNT(*) as count FROM deployments').get().count,
      activeApplications: db.prepare('SELECT COUNT(*) as count FROM applications WHERE status = "running"').get().count,
      totalRevenue: db.prepare('SELECT SUM(amount) as total FROM transactions WHERE type = "debit"').get().total || 0,
      suspendedUsers: db.prepare('SELECT COUNT(*) as count FROM users WHERE suspended = TRUE').get().count
    };

    res.json(stats);
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get all users
router.get('/users', (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const offset = (page - 1) * limit;
    
    const db = getDatabase();
    
    let query = `
      SELECT u.*, 
             (SELECT COUNT(*) FROM applications a WHERE a.userId = u.id) as applicationCount,
             (SELECT SUM(amount) FROM transactions t WHERE t.userId = u.id AND t.type = 'debit') as totalSpent
      FROM users u
    `;
    
    let params = [];
    
    if (search) {
      query += ' WHERE u.email LIKE ? OR u.firstName LIKE ? OR u.lastName LIKE ?';
      params = [`%${search}%`, `%${search}%`, `%${search}%`];
    }
    
    query += ' ORDER BY u.createdAt DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const users = db.prepare(query).all(...params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM users';
    let countParams = [];
    
    if (search) {
      countQuery += ' WHERE email LIKE ? OR firstName LIKE ? OR lastName LIKE ?';
      countParams = [`%${search}%`, `%${search}%`, `%${search}%`];
    }
    
    const total = db.prepare(countQuery).get(...countParams).total;
    
    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get all applications
router.get('/applications', (req, res) => {
  try {
    const { page = 1, limit = 20, status = '' } = req.query;
    const offset = (page - 1) * limit;
    
    const db = getDatabase();
    
    let query = `
      SELECT a.*, u.email as userEmail, u.firstName, u.lastName,
             (SELECT COUNT(*) FROM deployments d WHERE d.applicationId = a.id) as deploymentCount
      FROM applications a
      JOIN users u ON a.userId = u.id
    `;
    
    let params = [];
    
    if (status) {
      query += ' WHERE a.status = ?';
      params = [status];
    }
    
    query += ' ORDER BY a.createdAt DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const applications = db.prepare(query).all(...params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM applications';
    let countParams = [];
    
    if (status) {
      countQuery += ' WHERE status = ?';
      countParams = [status];
    }
    
    const total = db.prepare(countQuery).get(...countParams).total;
    
    res.json({
      applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Suspend/unsuspend user
router.patch('/users/:id/suspend', async (req, res) => {
  try {
    const { suspended } = req.body;
    const db = getDatabase();
    
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (user.role === 'admin') {
      return res.status(400).json({ error: 'Cannot suspend admin users' });
    }
    
    db.prepare('UPDATE users SET suspended = ? WHERE id = ?').run(suspended, req.params.id);
    
    await logActivity(req.user.id, 'user_suspended', `${suspended ? 'Suspended' : 'Unsuspended'} user: ${user.email}`, req.ip, req.get('User-Agent'));
    
    res.json({ message: `User ${suspended ? 'suspended' : 'unsuspended'} successfully` });
  } catch (error) {
    console.error('Suspend user error:', error);
    res.status(500).json({ error: 'Failed to update user status' });
  }
});

// Suspend/unsuspend application
router.patch('/applications/:id/suspend', async (req, res) => {
  try {
    const { suspended } = req.body;
    const db = getDatabase();
    
    const application = db.prepare('SELECT * FROM applications WHERE id = ?').get(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    db.prepare('UPDATE applications SET suspended = ? WHERE id = ?').run(suspended, req.params.id);
    
    await logActivity(req.user.id, 'application_suspended', `${suspended ? 'Suspended' : 'Unsuspended'} application: ${application.name}`, req.ip, req.get('User-Agent'));
    
    res.json({ message: `Application ${suspended ? 'suspended' : 'unsuspended'} successfully` });
  } catch (error) {
    console.error('Suspend application error:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

// Generate redeem code
router.post('/redeem-codes', async (req, res) => {
  try {
    const { credits, expiresIn = 30 } = req.body;
    
    if (!credits || credits <= 0) {
      return res.status(400).json({ error: 'Credits amount is required and must be positive' });
    }
    
    const db = getDatabase();
    const code = generateRedeemCode();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresIn);
    
    const codeId = uuidv4();
    db.prepare(`
      INSERT INTO redeemCodes (id, code, credits, expiresAt)
      VALUES (?, ?, ?, ?)
    `).run(codeId, code, credits, expiresAt.toISOString());
    
    await logActivity(req.user.id, 'redeem_code_generated', `Generated redeem code: ${code} for $${credits}`, req.ip, req.get('User-Agent'));
    
    res.json({
      code,
      credits,
      expiresAt: expiresAt.toISOString(),
      message: 'Redeem code generated successfully'
    });
  } catch (error) {
    console.error('Generate redeem code error:', error);
    res.status(500).json({ error: 'Failed to generate redeem code' });
  }
});

// Get redeem codes
router.get('/redeem-codes', (req, res) => {
  try {
    const db = getDatabase();
    const codes = db.prepare(`
      SELECT r.*, u.email as usedByEmail
      FROM redeemCodes r
      LEFT JOIN users u ON r.usedBy = u.id
      ORDER BY r.createdAt DESC
      LIMIT 50
    `).all();
    
    res.json(codes);
  } catch (error) {
    console.error('Get redeem codes error:', error);
    res.status(500).json({ error: 'Failed to fetch redeem codes' });
  }
});

// Get activity logs
router.get('/activity', (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    
    const db = getDatabase();
    const logs = db.prepare(`
      SELECT a.*, u.email as userEmail
      FROM activityLogs a
      JOIN users u ON a.userId = u.id
      ORDER BY a.createdAt DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset);
    
    const total = db.prepare('SELECT COUNT(*) as total FROM activityLogs').get().total;
    
    res.json({
      logs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({ error: 'Failed to fetch activity logs' });
  }
});

function generateRedeemCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

module.exports = router;