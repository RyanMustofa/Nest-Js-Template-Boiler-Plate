import {
  Controller,
  Get,
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

@Controller('backoffice/user')
@UseGuards(AuthenticationGuard)
@UseFilters(AuthFilter)
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  @Render('users/users.hbs')
  async findAll(@Req() req: Request): Promise<any> {
    console.log(req.user);
    return {
      title: await this.userService.getTitle(),
    };
  }
}
