import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/database/services/user.service';

@Controller('/api/v2/users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response): Promise<any> {
    return res.status(200).send({
      status: true,
      data: await this.userService.getData(),
    });
  }
}
