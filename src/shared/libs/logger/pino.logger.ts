import { resolve } from 'node:path';
import { injectable } from 'inversify';
import { Logger as PinoInstance, pino, transport } from 'pino';
import { Logger } from './logger.interface.js';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          level: 'debug',
          options: { destination }
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {}, // пустой объект означает использование stdout, т.е. консоль
        }
      ]
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created...');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
