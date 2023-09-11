import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controllers';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MenuMiddleware } from 'src/middleware/menu.middleware';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [UsersController],
  providers: [],
})
export class WebModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MenuMiddleware).forRoutes('*');
  }
}
