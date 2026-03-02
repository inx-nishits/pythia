module.exports = {
  apps: [
    {
      name: 'pythia-landing',
      script: 'server.js',
      instances: process.env.PM2_INSTANCES || 'max', // Use all available CPUs
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0'
      },
      // Restart settings
      max_restarts: 10,
      min_uptime: '10s',
      
      // Memory and performance
      max_memory_restart: '1G',
      
      // Logging (will use Docker logs)
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Auto restart on file changes (disable in production)
      watch: false,
      
      // Environment variables
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0'
      }
    }
  ]
}; 