import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
)
export class AuthFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (request.originalUrl.includes('backoffice')) {
      if (exception instanceof NotFoundException) {
        return response.render('error404/index');
      }
      if (exception instanceof InternalServerErrorException) {
        return response.render('error500/index');
      }
      if (exception instanceof UnauthorizedException) {
        request.flash('login', 'Username or Password failed');
        return response.status(status).redirect('/backoffice/auth');
      }
      return response.status(status).redirect('/backoffice/auth');
    }
    return response.status(status).json(exception.getResponse());
  }
}
