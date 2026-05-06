module.exports = {
  apps: [
    {
      name: 'project-submission-frontend',
      script: 'npm',
      args: 'run preview -- --host 127.0.0.1 --port 6003',
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/frontend-err.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true,
      max_memory_restart: '512M'
    },
    {
      name: 'project-submission-backend',
      script: 'server/index.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 6002
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 6002,
        DB_NAME: 'project_submission',
        DB_USER: 'postgres',
        DB_PASSWORD: 'psql@11042026',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        JWT_SECRET: 'super-secret-key-project-2k26-prod'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024'
    }
  ]
};
