const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../database/init');

async function logActivity(userId, action, details, ipAddress = null, userAgent = null) {
  try {
    const db = getDatabase();
    const activityId = uuidv4();
    
    db.prepare(`
      INSERT INTO activityLogs (id, userId, action, details, ipAddress, userAgent)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(activityId, userId, action, details, ipAddress, userAgent);
    
    return true;
  } catch (error) {
    console.error('Log activity error:', error);
    return false;
  }
}

module.exports = {
  logActivity
};