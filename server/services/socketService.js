const { getDatabase } = require('../database/init');

function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join application room for real-time updates
    socket.on('join_app', (appId) => {
      socket.join(`app_${appId}`);
      console.log(`Client ${socket.id} joined app room: app_${appId}`);
    });

    // Leave application room
    socket.on('leave_app', (appId) => {
      socket.leave(`app_${appId}`);
      console.log(`Client ${socket.id} left app room: app_${appId}`);
    });

    // Get deployment logs
    socket.on('get_deployment_logs', (deploymentId) => {
      try {
        const db = getDatabase();
        const deployment = db.prepare('SELECT logs FROM deployments WHERE id = ?').get(deploymentId);
        
        if (deployment) {
          socket.emit('deployment_logs', {
            deploymentId,
            logs: deployment.logs
          });
        }
      } catch (error) {
        console.error('Get deployment logs error:', error);
        socket.emit('error', { message: 'Failed to fetch logs' });
      }
    });

    // Get application status
    socket.on('get_app_status', (appId) => {
      try {
        const db = getDatabase();
        const app = db.prepare('SELECT status, containerId FROM applications WHERE id = ?').get(appId);
        
        if (app) {
          socket.emit('app_status', {
            appId,
            status: app.status,
            containerId: app.containerId
          });
        }
      } catch (error) {
        console.error('Get app status error:', error);
        socket.emit('error', { message: 'Failed to fetch status' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

module.exports = {
  setupSocketHandlers
};