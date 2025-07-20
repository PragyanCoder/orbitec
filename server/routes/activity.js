const express = require('express');
const { getDatabase } = require('../database/init');

const router = express.Router();

// Get user's activity logs
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 50, category = 'all' } = req.query;
    const offset = (page - 1) * limit;
    
    const db = getDatabase();
    
    let query = `
      SELECT * FROM activityLogs 
      WHERE userId = ?
    `;
    let params = [req.user.id];
    
    if (category !== 'all') {
      query += ' AND action LIKE ?';
      params.push(`${category}_%`);
    }
    
    query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const activities = db.prepare(query).all(...params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM activityLogs WHERE userId = ?';
    let countParams = [req.user.id];
    
    if (category !== 'all') {
      countQuery += ' AND action LIKE ?';
      countParams.push(`${category}_%`);
    }
    
    const total = db.prepare(countQuery).get(...countParams).total;
    
    res.json({
      activities,
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

// Export activity logs
router.get('/export', (req, res) => {
  try {
    const { format = 'json', days = 30 } = req.query;
    const db = getDatabase();
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));
    
    const activities = db.prepare(`
      SELECT * FROM activityLogs 
      WHERE userId = ? AND createdAt >= ?
      ORDER BY createdAt DESC
    `).all(req.user.id, cutoffDate.toISOString());
    
    if (format === 'csv') {
      const csv = [
        'Timestamp,Action,Details,IP Address,User Agent',
        ...activities.map(activity => 
          `"${activity.createdAt}","${activity.action}","${activity.details}","${activity.ipAddress}","${activity.userAgent}"`
        )
      ].join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="activity-log-${days}days.csv"`);
      res.send(csv);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="activity-log-${days}days.json"`);
      res.json(activities);
    }
  } catch (error) {
    console.error('Export activity logs error:', error);
    res.status(500).json({ error: 'Failed to export activity logs' });
  }
});

module.exports = router;