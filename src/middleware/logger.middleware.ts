import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `(${moment().format('YYYY-MM-DD HH:mm:ss')}) [route] (${req.method}) (${
        req.originalUrl
      })`,
    );
    return next();
  }
}
