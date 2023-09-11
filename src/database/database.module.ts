import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './services/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'training',
      entities: ['dist/*/*/*.entity.js'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class DatabaseModule {}
