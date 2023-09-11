import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { UserService } from 'src/database/services/user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  @Render('users/users.hbs')
  async findAll(): Promise<any> {
    return {
      title: await this.userService.getTitle(),
    };
  }
}
