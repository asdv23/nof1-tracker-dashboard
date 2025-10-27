module.exports = {
  apps: [{
    name: 'nof1-tracker-dashboard',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    // 自动重启配置
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    // 优雅关闭
    kill_timeout: 5000,
    // 健康检查（可选）
    listen_timeout: 3000,
    shutdown_with_message: true
  }]
};

