import * as os from 'os';
import * as winston from 'winston';
const format = winston.format;

const myFormat = format.printf(
  ({ timestamp, host, level, stack, message, ms }) =>
    `${timestamp} [${host}] ${level}: ${stack || message} [${ms}]`,
);

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.colorize(),
    winston.format.splat(),
    winston.format.ms(),
    winston.format.json(),
  ),
  defaultMeta: { host: os.hostname() },
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'info',
      format: myFormat,
      handleExceptions: true,
    }),
    /* new LoggingWinston({
      level: 'debug',
      format: myFormat,
      handleExceptions: true,
    }), */
  ],
});

export default logger;
