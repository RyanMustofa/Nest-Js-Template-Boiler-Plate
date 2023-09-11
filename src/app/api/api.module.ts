import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [UsersController],
  providers: [],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/v2');
  }
}
