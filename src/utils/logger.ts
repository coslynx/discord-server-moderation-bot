import winston from 'winston';
import { format } from 'winston';
import { config } from '@utils/config';

const { combine, timestamp, label, prettyPrint } = format;

const logger = winston.createLogger({
  level: config.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    label({ label: 'ModerationBot' }),
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        label({ label: 'ModerationBot' }),
        timestamp(),
        prettyPrint(),
      ),
    }),
  ],
});

export { logger };