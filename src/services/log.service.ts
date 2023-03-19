import { Injectable, Logger } from '@nestjs/common';

// logger service
@Injectable()
export class LoggerService {
  logger = new Logger();

  get log() {
    return this.logger.log;
  }
}
