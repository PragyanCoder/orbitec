const express = require('express');
const { getDatabase } = require('../database/init');
const { logActivity } = require('../services/activityService');

const router = express.Router();

// Get user's deployments
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const deployments = db.prepare(`
      SELECT d.*, a.name as applicationName, a.subdomain
      FROM deployments d
      JOIN applications a ON d.applicationId = a.id
      WHERE a.userId = ?
      ORDER BY d.createdAt DESC
      LIMIT 50
    `).all(req.user.id);

    res.json(deployments);
  } catch (error) {
    console.error('Get deployments error:', error);
    res.status(500).json({ error: 'Failed to fetch deployments' });
  }
});

// Get deployment details
router.get('/:id', (req, res) => {
  try {
    const db = getDatabase();
    const deployment = db.prepare(`
      SELECT d.*, a.name as applicationName, a.subdomain
      FROM deployments d
      JOIN applications a ON d.applicationId = a.id
      WHERE d.id = ? AND a.userId = ?
    `).get(req.params.id, req.user.id);

    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }

    res.json(deployment);
  } catch (error) {
    console.error('Get deployment error:', error);
    res.status(500).json({ error: 'Failed to fetch deployment' });
  }
});

// Get deployment logs with real-time updates
router.get('/:id/logs', (req, res) => {
  try {
    const db = getDatabase();
    const deployment = db.prepare(`
      SELECT d.*, a.name as applicationName, a.subdomain
      FROM deployments d
      JOIN applications a ON d.applicationId = a.id
      WHERE d.id = ? AND a.userId = ?
    `).get(req.params.id, req.user.id);

    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }

    // Parse logs into array
    const logs = deployment.logs ? deployment.logs.split('\n').filter(log => log.trim()) : [];

    res.json({
      ...deployment,
      logs
    });
  } catch (error) {
    console.error('Get deployment logs error:', error);
    res.status(500).json({ error: 'Failed to fetch deployment logs' });
  }
});

// Retry failed deployment
router.post('/:id/retry', async (req, res) => {
  try {
    const db = getDatabase();
    const deployment = db.prepare(`
      SELECT d.*, a.name as applicationName
      FROM deployments d
      JOIN applications a ON d.applicationId = a.id
      WHERE d.id = ? AND a.userId = ?
    `).get(req.params.id, req.user.id);

    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }

    if (deployment.status !== 'failed') {
      return res.status(400).json({ error: 'Can only retry failed deployments' });
    }

    // Create new deployment
    const newDeploymentId = require('uuid').v4();
    db.prepare(`
      INSERT INTO deployments (id, applicationId, status, logs)
      VALUES (?, ?, ?, ?)
    `).run(newDeploymentId, deployment.applicationId, 'pending', 'Retrying deployment...\n');

    // Start deployment process
    const io = req.app.get('io');
    const { deployApplication } = require('../services/dockerService');
    deployApplication(deployment.applicationId, io);

    await logActivity(req.user.id, 'deployment_retried', `Retried deployment for ${deployment.applicationName}`, req.ip, req.get('User-Agent'));

    res.json({ 
      message: 'Deployment retry initiated',
      deploymentId: newDeploymentId
    });
  } catch (error) {
    console.error('Retry deployment error:', error);
    res.status(500).json({ error: 'Failed to retry deployment' });
  }
});

module.exports = router;