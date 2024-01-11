import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MenuService } from 'src/database/services/menu.service';

@Injectable()
export class MenuMiddleware implements NestMiddleware {
  constructor(private menuService: MenuService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let menu = await this.menuService.getMenu();

    res.locals = {
      ...res.locals,
      menus_data: await this.nestedData(menu),
      currentUrl: req.originalUrl,
    };

    // return res.status(200).send(await this.nestedData(menu));
    return next();
  }

  async nestedData(data) {
    let map = {},
      node,
      res = [],
      i;
    for (i = 0; i < data.length; i += 1) {
      map[data[i].id] = i;
      data[i].children = [];
    }
    for (i = 0; i < data.length; i += 1) {
      node = data[i];
      if (node.parentId !== null) {
        data[map[node.parentId]].children.push(node);
      } else {
        res.push(node);
      }
    }

    return res;
  }
}
