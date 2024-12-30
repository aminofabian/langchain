import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { envConfigs } from '../config/env.configs';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: envConfigs.jwt.secret,
      signOptions: {
        expiresIn: envConfigs.jwt.expirationTime,
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtStrategy,
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}
