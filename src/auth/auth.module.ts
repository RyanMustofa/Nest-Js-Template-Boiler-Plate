import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule, PassportModule],
  providers: [LocalStrategy, SessionSerializer, AuthService],
})
export class AuthModule {}
