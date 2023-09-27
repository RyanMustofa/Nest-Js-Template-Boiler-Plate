import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controllers';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MenuMiddleware } from 'src/middleware/menu.middleware';
import { AuthController } from './controllers/auth.controllers';
import { DashboardControllers } from './controllers/dashboard.controllers';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [UsersController, AuthController, DashboardControllers],
  providers: [],
})
export class WebModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MenuMiddleware).forRoutes('*');
  }
}
