module.exports = {
  apps: [
    {
      script: 'app.js',
      watch: '.',
      autorestart: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combine.log',
      time: true,
    },
  ],
  log: {
    date_format: 'YYYY-MM-DD',
    filename: './logs/pm2.log',
    error_filename: './logs/pm2_error.log',
    out_filename: './logs/pm2_out.log',
    max_size: '20M',
    num_backups: 3,
    watch: true,
    merge_logs: true,
  },
};
