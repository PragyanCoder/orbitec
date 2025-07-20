module.exports = {
  apps: [
    {
      name: 'orbit-backend',
      script: 'server.js',
      cwd: '/root/orbitec/server',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: '/root/orbitec/logs/err.log',
      out_file: '/root/orbitec/logs/out.log',
      log_file: '/root/orbitec/logs/combined.log',
      time: true
    }
  ]
};