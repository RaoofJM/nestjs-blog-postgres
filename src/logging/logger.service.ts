// winston-logger.service.ts
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as appRoot from 'app-root-path';

const logDirectory = `${appRoot}/logs`;

const options = {
  File: {
    level: 'info',
    filename: `${logDirectory}/app.log`,
    handleExceptions: true,
    format: winston.format.json(),
    maxsize: 5000000, // 5MB
    maxFiles: 5,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  },
};

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.File),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export class WinstonLoggerService implements LoggerService {
  log(message: string) {
    logger.info(message);
  }

  error(message: string, trace: string) {
    logger.error(message, { trace });
  }

  warn(message: string) {
    logger.warn(message);
  }

  debug(message: string) {
    logger.debug(message);
  }

  verbose(message: string) {
    logger.verbose(message);
  }
}

export default logger;
