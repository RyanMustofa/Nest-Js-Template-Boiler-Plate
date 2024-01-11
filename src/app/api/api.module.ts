import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { QueueService } from 'src/job/queue.service';
import { JobModule } from 'src/job/job.module';
import { PublicController } from './controllers/public.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, JobModule],
  controllers: [UsersController, PublicController],
  providers: [QueueService],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/v2');
  }
}
