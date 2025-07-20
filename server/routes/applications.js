const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../database/init');
const { deployApplication, stopApplication, startApplication, deleteApplication } = require('../services/dockerService');
const { logActivity } = require('../services/activityService');
const { deductCredits } = require('../services/billingService');

const router = express.Router();

// Get user's applications
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const applications = db.prepare(`
      SELECT a.*, 
             (SELECT COUNT(*) FROM deployments d WHERE d.applicationId = a.id) as deploymentCount,
             (SELECT d.createdAt FROM deployments d WHERE d.applicationId = a.id ORDER BY d.createdAt DESC LIMIT 1) as lastDeployment
      FROM applications a 
      WHERE a.userId = ? 
      ORDER BY a.createdAt DESC
    `).all(req.user.id);

    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get single application
router.get('/:id', (req, res) => {
  try {
    const db = getDatabase();
    const application = db.prepare(`
      SELECT a.*, 
             (SELECT COUNT(*) FROM deployments d WHERE d.applicationId = a.id) as deploymentCount
      FROM applications a 
      WHERE a.id = ? AND a.userId = ?
    `).get(req.params.id, req.user.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Parse envVars JSON
    application.envVars = JSON.parse(application.envVars || '{}');

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

// Create new application
router.post('/', async (req, res) => {
  try {
    const { name, repoUrl, branch = 'main', envVars = {} } = req.body;

    if (!name || !repoUrl) {
      return res.status(400).json({ error: 'Name and repository URL are required' });
    }

    // Check if user has credits or payment method
    if (req.user.credits < 5 && !req.user.hasPaymentMethod) {
      return res.status(402).json({ 
        error: 'Insufficient credits. Please add a payment method or redeem credits.' 
      });
    }

    const db = getDatabase();
    const appId = uuidv4();
    const subdomain = `${name}-${req.user.id.slice(-8)}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    // Check if subdomain already exists
    const existingApp = db.prepare('SELECT id FROM applications WHERE subdomain = ?').get(subdomain);
    if (existingApp) {
      return res.status(409).json({ error: 'Application name already exists. Please choose a different name.' });
    }

    // Create application record
    db.prepare(`
      INSERT INTO applications (id, name, userId, repoUrl, branch, envVars, subdomain, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(appId, name, req.user.id, repoUrl, branch, JSON.stringify(envVars), subdomain, 'building');

    // Log activity
    await logActivity(req.user.id, 'application_created', `Created application: ${name}`, req.ip, req.get('User-Agent'));

    // Start deployment process
    const io = req.app.get('io');
    deployApplication(appId, io);

    res.status(201).json({
      id: appId,
      name,
      subdomain,
      status: 'building',
      message: 'Application deployment started'
    });
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ error: 'Failed to create application' });
  }
});

// Update application
router.put('/:id', async (req, res) => {
  try {
    const { name, repoUrl, branch, envVars } = req.body;
    const db = getDatabase();

    const application = db.prepare('SELECT * FROM applications WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Update application
    db.prepare(`
      UPDATE applications 
      SET name = ?, repoUrl = ?, branch = ?, envVars = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ? AND userId = ?
    `).run(name || application.name, repoUrl || application.repoUrl, branch || application.branch, 
           JSON.stringify(envVars || JSON.parse(application.envVars)), req.params.id, req.user.id);

    await logActivity(req.user.id, 'application_updated', `Updated application: ${application.name}`, req.ip, req.get('User-Agent'));

    res.json({ message: 'Application updated successfully' });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// Start application
router.post('/:id/start', async (req, res) => {
  try {
    const db = getDatabase();
    const application = db.prepare('SELECT * FROM applications WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.status === 'running') {
      return res.status(400).json({ error: 'Application is already running' });
    }

    // Deduct credits for monthly usage
    const deducted = await deductCredits(req.user.id, 5, `Monthly charge for ${application.name}`);
    if (!deducted) {
      return res.status(402).json({ error: 'Insufficient credits. Please add funds.' });
    }

    const io = req.app.get('io');
    await startApplication(application.id, io);

    await logActivity(req.user.id, 'application_started', `Started application: ${application.name}`, req.ip, req.get('User-Agent'));

    res.json({ message: 'Application started successfully' });
  } catch (error) {
    console.error('Start application error:', error);
    res.status(500).json({ error: 'Failed to start application' });
  }
});

// Stop application
router.post('/:id/stop', async (req, res) => {
  try {
    const db = getDatabase();
    const application = db.prepare('SELECT * FROM applications WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const io = req.app.get('io');
    await stopApplication(application.id, io);

    await logActivity(req.user.id, 'application_stopped', `Stopped application: ${application.name}`, req.ip, req.get('User-Agent'));

    res.json({ message: 'Application stopped successfully' });
  } catch (error) {
    console.error('Stop application error:', error);
    res.status(500).json({ error: 'Failed to stop application' });
  }
});

// Restart application
router.post('/:id/restart', async (req, res) => {
  try {
    const db = getDatabase();
    const application = db.prepare('SELECT * FROM applications WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const io = req.app.get('io');
    await stopApplication(application.id, io);
    setTimeout(() => startApplication(application.id, io), 2000);

    await logActivity(req.user.id, 'application_restarted', `Restarted application: ${application.name}`, req.ip, req.get('User-Agent'));

    res.json({ message: 'Application restart initiated' });
  } catch (error) {
    console.error('Restart application error:', error);
    res.status(500).json({ error: 'Failed to restart application' });
  }
});

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    const db = getDatabase();
    const application = db.prepare('SELECT * FROM applications WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const io = req.app.get('io');
    await deleteApplication(application.id, io);

    // Delete from database
    db.prepare('DELETE FROM applications WHERE id = ? AND userId = ?').run(req.params.id, req.user.id);

    await logActivity(req.user.id, 'application_deleted', `Deleted application: ${application.name}`, req.ip, req.get('User-Agent'));

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

// Get application logs
router.get('/:id/logs', (req, res) => {
  try {
    const db = getDatabase();
    const application = db.prepare('SELECT * FROM applications WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const deployments = db.prepare(`
      SELECT * FROM deployments 
      WHERE applicationId = ? 
      ORDER BY createdAt DESC 
      LIMIT 10
    `).all(req.params.id);

    res.json(deployments);
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

module.exports = router;