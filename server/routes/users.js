const express = require('express');
const { getDatabase } = require('../database/init');
const { sanitizeUserData } = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/profile', (req, res) => {
  try {
    const db = getDatabase();
    const user = db.prepare(`
      SELECT id, email, firstName, lastName, role, credits, hasPaymentMethod, suspended, createdAt,
             (SELECT COUNT(*) FROM applications WHERE userId = ?) as applicationCount
      FROM users WHERE id = ?
    `).get(req.user.id, req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Security: Remove sensitive data before sending to client
    const sanitizedUser = sanitizeUserData(user);

    res.json(sanitizedUser);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const db = getDatabase();

    db.prepare(`
      UPDATE users 
      SET firstName = ?, lastName = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(firstName, lastName, req.user.id);

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;