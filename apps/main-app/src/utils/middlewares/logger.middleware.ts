import { ConsoleLogger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export class LoggerMiddleware extends ConsoleLogger {
  private logger = new Logger();

  constructor() {
    super();
  }

  use(req: Request, res: Response, next: NextFunction) {
    const correlation_id = uuidv4();

    this.logger.log(
      `Logging HTTP request: id:${correlation_id} => method: ${req.method}, path: ${req.path}, status_code: ${res.statusCode}, params: ${JSON.stringify(req.body)}`,
    );

    // attach the correlation id to the context
    req.headers['x-correlation-id'] = correlation_id;
    res.setHeader['x-correlation-id'] = correlation_id;
    next();
  }
}
