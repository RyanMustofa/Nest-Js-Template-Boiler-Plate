import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { Request, Response } from 'express';
import { AuthFilter } from 'src/auth/auth.filter';
import { AuthenticationGuard } from 'src/auth/guard/auth.guard';
import { LoginGuard } from 'src/auth/guard/login.guard';
import { UserService } from 'src/database/services/user.service';

@Controller('backoffice/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Render('auth/login.hbs')
  async Login(
    @Query('status') status: string = 'false',
    @Query('logout') logout: string = 'false',
  ) {
    return {
      title: 'Auth',
      status: status === 'true',
      logout: logout === 'true',
    };
  }

  @Post('/signin')
  @UseGuards(LoginGuard)
  @UseFilters(AuthFilter)
  async Signin(@Res() res: Response) {
    res.redirect('/backoffice/auth?status=true');
  }

  @Post('/signup')
  async Signup(
    @Body('username') username: string = '',
    @Body('password') password: string = '',
    @Body('name') name: string = '',
    @Res() res: Response,
  ) {
    let obj = {
      username,
      password,
      name,
    };
    const newpassword = await hash(obj.password, 10);
    obj.password = newpassword;
    await this.userService.insertUser(obj);
    return res.status(200).send({
      obj,
    });
  }

  @Get('/logout')
  @UseFilters(AuthFilter)
  @UseGuards(AuthenticationGuard)
  async Logout(@Req() req: Request, @Res() res: Response) {
    req.logout({}, (err) => {
      console.error(err);
    });
    return res.redirect('/backoffice/auth?logout=true');
  }
}
