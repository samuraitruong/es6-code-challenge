import {
  createLogger,
  format,
  transports,
} from 'winston';
const {
  combine,
  timestamp,
  label,
  splat,
  printf,
} = format;

// TODO: move some confiuration value to config file
const logger = createLogger({
  format: combine(
      label({
        label: 'API',
      }),
      timestamp(),
      splat(),
      printf((info) => `[${info.level}] ${info.timestamp}: ${info.message}`),
  ),
  transports: [
    new transports.File({
      level: 'info',
      filename: './logs/logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};
export default logger;
