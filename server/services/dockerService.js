const Docker = require('dockerode');
const fs = require('fs').promises;
const path = require('path');
const simpleGit = require('simple-git');
const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../database/init');

const docker = new Docker({ socketPath: process.env.DOCKER_SOCKET || '/var/run/docker.sock' });

async function deployApplication(appId, io) {
  const db = getDatabase();
  let deploymentId = uuidv4();
  
  try {
    // Get application details
    const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(appId);
    if (!app) {
      throw new Error('Application not found');
    }

    // Create deployment record
    db.prepare(`
      INSERT INTO deployments (id, applicationId, status, logs)
      VALUES (?, ?, ?, ?)
    `).run(deploymentId, appId, 'building', 'Starting deployment...\n');

    const roomName = `app_${appId}`;
    
    // Emit initial status
    io.to(roomName).emit('deployment_status', {
      appId,
      deploymentId,
      status: 'building',
      message: 'Starting deployment...'
    });

    // Clone repository
    await emitLog(io, roomName, deploymentId, 'Cloning repository...');
    const repoPath = path.join(process.env.APPS_BASE_PATH || '/tmp/orbit-apps', appId);
    
    // Ensure directory exists
    await fs.mkdir(repoPath, { recursive: true });
    
    const git = simpleGit();
    await git.clone(app.repoUrl, repoPath, ['--branch', app.branch || 'main']);
    
    await emitLog(io, roomName, deploymentId, 'Repository cloned successfully');

    // Create Dockerfile if not exists
    const dockerfilePath = path.join(repoPath, 'Dockerfile');
    try {
      await fs.access(dockerfilePath);
    } catch {
      await emitLog(io, roomName, deploymentId, 'Creating Dockerfile...');
      await createDefaultDockerfile(repoPath);
    }

    // Build Docker image
    await emitLog(io, roomName, deploymentId, 'Building Docker image...');
    const imageName = `orbit-app-${appId}:latest`;
    
    const buildStream = await docker.buildImage({
      context: repoPath,
      src: ['.']
    }, {
      t: imageName,
      dockerfile: 'Dockerfile'
    });

    // Stream build logs
    await new Promise((resolve, reject) => {
      docker.modem.followProgress(buildStream, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }, (event) => {
        if (event.stream) {
          emitLog(io, roomName, deploymentId, event.stream.trim());
        }
      });
    });

    await emitLog(io, roomName, deploymentId, 'Docker image built successfully');

    // Find available port
    const port = await findAvailablePort();
    
    // Parse environment variables
    const envVars = JSON.parse(app.envVars || '{}');
    const envArray = Object.entries(envVars).map(([key, value]) => `${key}=${value}`);
    envArray.push(`PORT=${port}`);

    // Create and start container
    await emitLog(io, roomName, deploymentId, 'Starting container...');
    
    const container = await docker.createContainer({
      Image: imageName,
      name: `orbit-app-${appId}`,
      Env: envArray,
      ExposedPorts: {
        [`${port}/tcp`]: {}
      },
      HostConfig: {
        PortBindings: {
          [`${port}/tcp`]: [{ HostPort: port.toString() }]
        },
        RestartPolicy: {
          Name: 'unless-stopped'
        }
      },
      Labels: {
        'orbit.app.id': appId,
        'orbit.app.name': app.name,
        'orbit.user.id': app.userId
      }
    });

    await container.start();
    
    // Update application with container info
    db.prepare(`
      UPDATE applications 
      SET status = ?, containerId = ?, port = ?, lastDeployment = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run('running', container.id, port, appId);

    // Update deployment status
    db.prepare(`
      UPDATE deployments 
      SET status = ?, buildTime = ?
      WHERE id = ?
    `).run('success', Date.now(), deploymentId);

    await emitLog(io, roomName, deploymentId, `Application deployed successfully!`);
    await emitLog(io, roomName, deploymentId, `Access your app at: https://${app.subdomain}.${process.env.DOMAIN}`);

    // Configure nginx (if available)
    await configureNginx(app.subdomain, port);

    io.to(roomName).emit('deployment_complete', {
      appId,
      deploymentId,
      status: 'success',
      url: `https://${app.subdomain}.${process.env.DOMAIN}`,
      port
    });

  } catch (error) {
    console.error('Deployment error:', error);
    
    // Update deployment status
    db.prepare(`
      UPDATE deployments 
      SET status = ?, logs = logs || ?
      WHERE id = ?
    `).run('failed', `\nError: ${error.message}\n`, deploymentId);

    // Update application status
    db.prepare('UPDATE applications SET status = ? WHERE id = ?').run('failed', appId);

    const roomName = `app_${appId}`;
    await emitLog(io, roomName, deploymentId, `Deployment failed: ${error.message}`);
    
    io.to(roomName).emit('deployment_failed', {
      appId,
      deploymentId,
      error: error.message
    });
  }
}

async function stopApplication(appId, io) {
  try {
    const db = getDatabase();
    const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(appId);
    
    if (!app || !app.containerId) {
      throw new Error('Application or container not found');
    }

    const container = docker.getContainer(app.containerId);
    await container.stop();

    db.prepare('UPDATE applications SET status = ? WHERE id = ?').run('stopped', appId);

    const roomName = `app_${appId}`;
    io.to(roomName).emit('app_status_changed', {
      appId,
      status: 'stopped'
    });

  } catch (error) {
    console.error('Stop application error:', error);
    throw error;
  }
}

async function startApplication(appId, io) {
  try {
    const db = getDatabase();
    const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(appId);
    
    if (!app || !app.containerId) {
      throw new Error('Application or container not found');
    }

    const container = docker.getContainer(app.containerId);
    await container.start();

    db.prepare('UPDATE applications SET status = ? WHERE id = ?').run('running', appId);

    const roomName = `app_${appId}`;
    io.to(roomName).emit('app_status_changed', {
      appId,
      status: 'running'
    });

  } catch (error) {
    console.error('Start application error:', error);
    throw error;
  }
}

async function deleteApplication(appId, io) {
  try {
    const db = getDatabase();
    const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(appId);
    
    if (app && app.containerId) {
      const container = docker.getContainer(app.containerId);
      
      try {
        await container.stop();
      } catch (e) {
        // Container might already be stopped
      }
      
      await container.remove();
    }

    // Remove nginx config
    await removeNginxConfig(app.subdomain);

    // Clean up files
    const repoPath = path.join(process.env.APPS_BASE_PATH || '/tmp/orbit-apps', appId);
    try {
      await fs.rmdir(repoPath, { recursive: true });
    } catch (e) {
      // Directory might not exist
    }

    const roomName = `app_${appId}`;
    io.to(roomName).emit('app_deleted', { appId });

  } catch (error) {
    console.error('Delete application error:', error);
    throw error;
  }
}

async function createDefaultDockerfile(repoPath) {
  // Check for package.json (Node.js)
  try {
    await fs.access(path.join(repoPath, 'package.json'));
    const dockerfile = `
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
`;
    await fs.writeFile(path.join(repoPath, 'Dockerfile'), dockerfile.trim());
    return;
  } catch {}

  // Check for requirements.txt (Python)
  try {
    await fs.access(path.join(repoPath, 'requirements.txt'));
    const dockerfile = `
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]
`;
    await fs.writeFile(path.join(repoPath, 'Dockerfile'), dockerfile.trim());
    return;
  } catch {}

  // Default Dockerfile
  const dockerfile = `
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
`;
  await fs.writeFile(path.join(repoPath, 'Dockerfile'), dockerfile.trim());
}

async function findAvailablePort() {
  const usedPorts = new Set();
  
  // Get ports from database
  const db = getDatabase();
  const apps = db.prepare('SELECT port FROM applications WHERE port IS NOT NULL').all();
  apps.forEach(app => usedPorts.add(app.port));

  // Find available port starting from 8000
  for (let port = 8000; port < 9000; port++) {
    if (!usedPorts.has(port)) {
      return port;
    }
  }
  
  throw new Error('No available ports');
}

async function configureNginx(subdomain, port) {
  try {
    const nginxConfig = `
server {
    listen 80;
    server_name ${subdomain}.${process.env.DOMAIN};
    
    location / {
        proxy_pass http://localhost:${port};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`;

    const configPath = path.join(process.env.NGINX_CONFIG_PATH || '/etc/nginx/sites-available', `${subdomain}.${process.env.DOMAIN}`);
    await fs.writeFile(configPath, nginxConfig.trim());
    
    // Enable site (create symlink)
    const enabledPath = path.join(process.env.NGINX_CONFIG_PATH?.replace('available', 'enabled') || '/etc/nginx/sites-enabled', `${subdomain}.${process.env.DOMAIN}`);
    try {
      await fs.symlink(configPath, enabledPath);
    } catch (e) {
      // Symlink might already exist
    }
    
    // Reload nginx (you might need to run this with sudo)
    // exec('sudo nginx -s reload');
    
  } catch (error) {
    console.error('Nginx configuration error:', error);
    // Don't throw error as this is not critical for basic functionality
  }
}

async function removeNginxConfig(subdomain) {
  try {
    const configPath = path.join(process.env.NGINX_CONFIG_PATH || '/etc/nginx/sites-available', `${subdomain}.${process.env.DOMAIN}`);
    const enabledPath = path.join(process.env.NGINX_CONFIG_PATH?.replace('available', 'enabled') || '/etc/nginx/sites-enabled', `${subdomain}.${process.env.DOMAIN}`);
    
    await fs.unlink(enabledPath).catch(() => {});
    await fs.unlink(configPath).catch(() => {});
    
    // Reload nginx
    // exec('sudo nginx -s reload');
    
  } catch (error) {
    console.error('Remove nginx config error:', error);
  }
}

async function emitLog(io, roomName, deploymentId, message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  
  // Update deployment logs in database
  const db = getDatabase();
  db.prepare(`
    UPDATE deployments 
    SET logs = logs || ? 
    WHERE id = ?
  `).run(`${logMessage}\n`, deploymentId);
  
  // Emit to connected clients
  io.to(roomName).emit('deployment_log', {
    deploymentId,
    message: logMessage,
    timestamp
  });
}

module.exports = {
  deployApplication,
  stopApplication,
  startApplication,
  deleteApplication
};