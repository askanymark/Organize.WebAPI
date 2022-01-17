import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { Local } from './strategies/local';
import { SECRET } from '../constants';
import { Jwt } from './strategies/jwt';
import { JwtAuth } from './guards/jwt-auth';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    Local,
    Jwt,
    {
      provide: APP_GUARD,
      useClass: JwtAuth,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
