const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { getDatabase } = require('../database/init');

const authenticateToken = async (req, res, next) => {
  try {
    // Use Clerk's authentication middleware
    const clerkAuth = ClerkExpressRequireAuth();
    
    clerkAuth(req, res, async (err) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userId = req.auth.userId;
      const db = getDatabase();
      
      // Get or create user in our database
      let user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
      
      if (!user) {
        // Create user from Clerk data
        const clerkUser = await req.auth.getUser();
        
        user = {
          id: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
          role: clerkUser.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL ? 'admin' : 'user',
          credits: 0,
          hasPaymentMethod: false,
          suspended: false
        };
        
        db.prepare(`
          INSERT INTO users (id, email, firstName, lastName, role, credits, hasPaymentMethod, suspended)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(user.id, user.email, user.firstName, user.lastName, user.role, user.credits, user.hasPaymentMethod, user.suspended);
      }
      
      // Check if user is suspended
      if (user.suspended && user.role !== 'admin') {
        return res.status(403).json({ error: 'Account suspended' });
      }
      
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  // Additional security: Log admin access attempts
  console.log(`Admin access: ${req.user.email} accessing ${req.path} from ${req.ip}`);
  
  next();
};

// Security middleware to prevent access to sensitive data
const sanitizeUserData = (user) => {
  const sanitized = { ...user };
  delete sanitized.stripeCustomerId;
  delete sanitized.suspended;
  return sanitized;
};

module.exports = {
  authenticateToken,
  requireAdmin,
  sanitizeUserData
};