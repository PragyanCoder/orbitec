const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../database/init');
const { logActivity } = require('../services/activityService');

const router = express.Router();

// Get user's domains
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const domains = db.prepare(`
      SELECT d.*, a.name as applicationName
      FROM domains d
      JOIN applications a ON d.applicationId = a.id
      WHERE a.userId = ?
      ORDER BY d.createdAt DESC
    `).all(req.user.id);

    res.json(domains);
  } catch (error) {
    console.error('Get domains error:', error);
    res.status(500).json({ error: 'Failed to fetch domains' });
  }
});

// Add custom domain
router.post('/', async (req, res) => {
  try {
    const { domain, applicationId } = req.body;

    if (!domain || !applicationId) {
      return res.status(400).json({ error: 'Domain and application ID are required' });
    }

    const db = getDatabase();
    
    // Verify application belongs to user
    const application = db.prepare('SELECT * FROM applications WHERE id = ? AND userId = ?').get(applicationId, req.user.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check if domain already exists
    const existingDomain = db.prepare('SELECT id FROM domains WHERE domain = ?').get(domain);
    if (existingDomain) {
      return res.status(409).json({ error: 'Domain already exists' });
    }

    const domainId = uuidv4();
    db.prepare(`
      INSERT INTO domains (id, domain, applicationId, status, sslStatus)
      VALUES (?, ?, ?, ?, ?)
    `).run(domainId, domain, applicationId, 'pending', 'pending');

    await logActivity(req.user.id, 'domain_added', `Added custom domain: ${domain}`, req.ip, req.get('User-Agent'));

    res.status(201).json({
      id: domainId,
      domain,
      applicationId,
      status: 'pending',
      message: 'Domain added successfully. Please configure your DNS settings.'
    });
  } catch (error) {
    console.error('Add domain error:', error);
    res.status(500).json({ error: 'Failed to add domain' });
  }
});

// Update domain status (for DNS verification)
router.patch('/:id/verify', async (req, res) => {
  try {
    const db = getDatabase();
    const domain = db.prepare(`
      SELECT d.*, a.userId
      FROM domains d
      JOIN applications a ON d.applicationId = a.id
      WHERE d.id = ? AND a.userId = ?
    `).get(req.params.id, req.user.id);

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    // TODO: Implement actual DNS verification
    const isVerified = Math.random() > 0.5; // Mock verification

    const newStatus = isVerified ? 'active' : 'failed';
    const sslStatus = isVerified ? 'active' : 'failed';

    db.prepare(`
      UPDATE domains 
      SET status = ?, sslStatus = ?, verifiedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(newStatus, sslStatus, req.params.id);

    await logActivity(req.user.id, 'domain_verified', `Domain verification ${isVerified ? 'successful' : 'failed'}: ${domain.domain}`, req.ip, req.get('User-Agent'));

    res.json({
      status: newStatus,
      sslStatus,
      verified: isVerified,
      message: isVerified ? 'Domain verified successfully' : 'Domain verification failed'
    });
  } catch (error) {
    console.error('Verify domain error:', error);
    res.status(500).json({ error: 'Failed to verify domain' });
  }
});

// Delete domain
router.delete('/:id', async (req, res) => {
  try {
    const db = getDatabase();
    const domain = db.prepare(`
      SELECT d.*, a.userId
      FROM domains d
      JOIN applications a ON d.applicationId = a.id
      WHERE d.id = ? AND a.userId = ?
    `).get(req.params.id, req.user.id);

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    db.prepare('DELETE FROM domains WHERE id = ?').run(req.params.id);

    await logActivity(req.user.id, 'domain_deleted', `Deleted custom domain: ${domain.domain}`, req.ip, req.get('User-Agent'));

    res.json({ message: 'Domain deleted successfully' });
  } catch (error) {
    console.error('Delete domain error:', error);
    res.status(500).json({ error: 'Failed to delete domain' });
  }
});

module.exports = router;