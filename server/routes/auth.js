const express = require('express');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const router = express.Router();

// Verify authentication
router.get('/verify', ClerkExpressRequireAuth(), (req, res) => {
  res.json({ 
    authenticated: true, 
    userId: req.auth.userId 
  });
});

module.exports = router;