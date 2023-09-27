import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { AuthFilter } from 'src/auth/auth.filter';
import { AuthenticationGuard } from 'src/auth/guard/auth.guard';

@Controller('backoffice/dashboard')
@UseGuards(AuthenticationGuard)
@UseFilters(AuthFilter)
export class DashboardControllers {
  @Get()
  @Render('dashboard/index.hbs')
  async index() {
    return {
      title: 'dashboard',
    };
  }
}
