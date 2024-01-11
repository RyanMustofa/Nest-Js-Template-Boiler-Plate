import {
  Controller,
  Get,
  Query,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthFilter } from 'src/auth/auth.filter';
import { AuthenticationGuard } from 'src/auth/guard/auth.guard';
import { UserService } from 'src/database/services/user.service';
import { getPagination } from 'src/helpers/pagination.helpers';

@Controller('backoffice/user')
@UseGuards(AuthenticationGuard)
@UseFilters(AuthFilter)
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  @Render('users/users.hbs')
  async findAll(
    @Req() req: Request,
    @Query('page') page: any = 1,
    @Query('limit') limit: any = 10,
  ): Promise<any> {
    console.log(req.user);
    let data = await this.userService.getDataWithPagination(page, limit);
    console.log(getPagination(page, data.total, limit));
    return {
      ...data,
      pages: getPagination(page, data.total, limit),
      page,
      limit,
    };
  }
}
