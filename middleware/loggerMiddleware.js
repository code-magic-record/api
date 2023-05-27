const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const onFinished = require("on-finished");
const path = require("path");
const dayjs = require("dayjs");

// 日志输出目录
const logDir = path.resolve(__dirname, "../", "logs");

/**
 * 时间格式化
 */
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  const formattedTimestamp = dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
  return `[${formattedTimestamp}] ${level}: ${message}`;
});

// winston 格式化器
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  customFormat
);

// 设置 dailyRotateFile
const dailyRotateFileTransport = new DailyRotateFile({
  filename: `${logDir}/%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "15d",
});

// 创建 logger 实例
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [dailyRotateFileTransport],
});

// 日志中间件
const loggerMiddleware = (req, res, next) => {
  // 记录请求的相关信息
  logger.info(`[${req.method}] ${req.url} - ${req.ip}`);

  // 设置响应时间
  const start = Date.now();
  onFinished(res, () => {
    const durationInMilliseconds = Date.now() - start;
    logger.info(
      `[${req.method}] ${req.url} - ${
        res.statusCode
      } - ${durationInMilliseconds.toLocaleString()} ms`
    );
  });

  next();
};

module.exports = { logger, loggerMiddleware };
