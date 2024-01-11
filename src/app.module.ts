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
import { JobModule } from './job/job.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ApiModule,
    WebModule,
    AuthModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        LoggerMiddleware,
        FlashMiddleware,
        cors(),
        helmet({
          crossOriginEmbedderPolicy: false,
          contentSecurityPolicy: {
            directives: {
              imgSrc: [
                `'self'`,
                'data:',
                'apollo-server-landing-page.cdn.apollographql.com',
              ],
              scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
              manifestSrc: [
                `'self'`,
                'apollo-server-landing-page.cdn.apollographql.com',
              ],
              frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
            },
          },
        }),
      )
      .forRoutes('*');
  }
}
