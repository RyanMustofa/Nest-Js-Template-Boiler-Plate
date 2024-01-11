import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './services/user.service';
import { ConfigModule } from '@nestjs/config';
import { Menu } from './entity/menu.entity';
import { MenuService } from './services/menu.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/*/*/*.entity.js'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Menu]),
  ],
  controllers: [],
  providers: [UserService, MenuService],
  exports: [TypeOrmModule, UserService, MenuService],
})
export class DatabaseModule {}
