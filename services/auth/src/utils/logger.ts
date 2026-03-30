import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors, json } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create logger
const log = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // logs stack trace
    json(),
  ),
  transports: [
    // Console transport (dev-friendly)
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat,
      ),
    }),

    // File transport for errors
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // File transport for all logs
    new transports.File({
      filename: "logs/combined.log",
    }),
  ],

  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],

  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],
});

// Export logger
export default log;
