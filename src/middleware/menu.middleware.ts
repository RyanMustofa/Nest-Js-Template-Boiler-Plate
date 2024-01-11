import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class MenuMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.locals = {
      ...res.locals,
      menus_data: 'testing',
      currentUrl: req.originalUrl,
    };
    console.log(req.originalUrl);
    return next();
  }
}
