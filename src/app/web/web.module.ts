import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controllers';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [UsersController],
  providers: [],
})
export class WebModule {}
