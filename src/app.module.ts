import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './app/api/api.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { WebModule } from './app/web/web.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import helmet from 'helmet';
import * as cors from 'cors';
import { AuthModule } from './auth/auth.module';
import { FlashMiddleware } from './middleware/flash.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ApiModule,
    WebModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, FlashMiddleware, cors(), helmet())
      .forRoutes('*');
  }
}
