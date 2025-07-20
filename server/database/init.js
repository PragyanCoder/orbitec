const Database = require('better-sqlite3');
const path = require('path');

let db;

function initializeDatabase() {
  try {
    db = new Database(path.join(__dirname, '../database.sqlite'));
    
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
    
    // Create tables
    createTables();
    
    // Create admin user
    createAdminUser();
    
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

function createTables() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
      credits REAL DEFAULT 0,
      hasPaymentMethod BOOLEAN DEFAULT FALSE,
      stripeCustomerId TEXT,
      suspended BOOLEAN DEFAULT FALSE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Applications table
  db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      userId TEXT NOT NULL,
      repoUrl TEXT NOT NULL,
      branch TEXT DEFAULT 'main',
      envVars TEXT DEFAULT '{}',
      status TEXT DEFAULT 'stopped' CHECK (status IN ('building', 'running', 'stopped', 'failed')),
      subdomain TEXT UNIQUE NOT NULL,
      containerId TEXT,
      port INTEGER,
      suspended BOOLEAN DEFAULT FALSE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      lastDeployment DATETIME,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Deployments table
  db.exec(`
    CREATE TABLE IF NOT EXISTS deployments (
      id TEXT PRIMARY KEY,
      applicationId TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'building', 'success', 'failed')),
      logs TEXT DEFAULT '',
      buildTime INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (applicationId) REFERENCES applications (id) ON DELETE CASCADE
    )
  `);

  // Redeem codes table
  db.exec(`
    CREATE TABLE IF NOT EXISTS redeemCodes (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      credits REAL NOT NULL,
      used BOOLEAN DEFAULT FALSE,
      usedBy TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      expiresAt DATETIME,
      FOREIGN KEY (usedBy) REFERENCES users (id)
    )
  `);

  // Billing transactions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
      amount REAL NOT NULL,
      description TEXT NOT NULL,
      stripePaymentId TEXT,
      status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Activity logs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS activityLogs (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      action TEXT NOT NULL,
      details TEXT NOT NULL,
      ipAddress TEXT,
      userAgent TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Domains table
  db.exec(`
    CREATE TABLE IF NOT EXISTS domains (
      id TEXT PRIMARY KEY,
      domain TEXT UNIQUE NOT NULL,
      applicationId TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'failed')),
      sslStatus TEXT DEFAULT 'pending' CHECK (sslStatus IN ('pending', 'active', 'failed')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      verifiedAt DATETIME,
      FOREIGN KEY (applicationId) REFERENCES applications (id) ON DELETE CASCADE
    )
  `);

  // API keys table
  db.exec(`
    CREATE TABLE IF NOT EXISTS apiKeys (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      name TEXT NOT NULL,
      keyHash TEXT NOT NULL,
      lastUsed DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      expiresAt DATETIME,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // User settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS userSettings (
      userId TEXT PRIMARY KEY,
      timezone TEXT DEFAULT 'UTC',
      language TEXT DEFAULT 'en',
      emailNotifications BOOLEAN DEFAULT TRUE,
      deploymentNotifications BOOLEAN DEFAULT TRUE,
      billingNotifications BOOLEAN DEFAULT TRUE,
      securityNotifications BOOLEAN DEFAULT TRUE,
      twoFactorEnabled BOOLEAN DEFAULT FALSE,
      sessionTimeout INTEGER DEFAULT 30,
      webhookUrl TEXT,
      webhookSecret TEXT,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Payment methods table
  db.exec(`
    CREATE TABLE IF NOT EXISTS paymentMethods (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      stripePaymentMethodId TEXT NOT NULL,
      type TEXT NOT NULL,
      last4 TEXT NOT NULL,
      expiryMonth INTEGER,
      expiryYear INTEGER,
      isDefault BOOLEAN DEFAULT FALSE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);
}

function createAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL || 'pragyanpandey0106@gmail.com';
  
  const existingAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
  
  if (!existingAdmin) {
    const adminId = 'admin_' + Date.now();
    db.prepare(`
      INSERT INTO users (id, email, firstName, lastName, role, credits)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(adminId, adminEmail, 'Pragyan', 'Pandey', 'admin', 10000);
    
    console.log(`✅ Admin user created: ${adminEmail}`);
  }
}

function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

module.exports = {
  initializeDatabase,
  getDatabase
};