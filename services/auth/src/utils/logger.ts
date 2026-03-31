import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors, json } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const log = createLogger({
  level: process.env.LOG_LEVEL || "info",

  // ✅ Keep base format minimal
  format: combine(
    errors({ stack: true }), // only stack handling here
  ),

  transports: [
    // ✅ Console (human readable)
    new transports.Console({
      level: "debug", // 👈 important fix
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat,
      ),
    }),

    // ✅ Error file (JSON)
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(timestamp(), errors({ stack: true }), json()),
    }),

    // ✅ Combined file (JSON)
    new transports.File({
      filename: "logs/combined.log",
      format: combine(timestamp(), errors({ stack: true }), json()),
    }),
  ],

  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],

  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],
});

export default log;
