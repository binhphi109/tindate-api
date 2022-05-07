import winston, { Logger } from "winston";
import { consoleFormat } from "winston-console-format";

let logger: Logger;

const options = {
  console: {
    level: "info",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.padLevels(),
      consoleFormat({
        showMeta: true,
        metaStrip: ["timestamp", "service"],
        inspectOptions: {
          depth: Infinity,
          colors: true,
          maxArrayLength: Infinity,
          breakLength: 120,
          compact: Infinity,
        },
      })
    ),
  },
};

// Default transports
const transports = [new winston.transports.Console(options.console)];

function init() {
  logger = winston.createLogger({
    transports,
    exitOnError: false,
  });

  console.log = (...args) => {
    logger.info.apply(logger, [Array.prototype.slice.call(args)]);
  };
  console.info = (...args) => {
    logger.info.apply(logger, [Array.prototype.slice.call(args)]);
  };
  console.warn = (...args) => {
    logger.warn.apply(logger, [Array.prototype.slice.call(args)]);
  };
  console.error = (...args) => {
    logger.error.apply(logger, [Array.prototype.slice.call(args)]);
  };
  console.debug = (...args) => {
    logger.debug.apply(logger, [Array.prototype.slice.call(args)]);
  };

  return logger;
}

export class LoggerStream {
  write(message: string) {
    if (logger) {
      logger.info(message);
    }
  }
}

export default {
  init,
};
