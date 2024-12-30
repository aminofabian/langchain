import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { envConfigs } from '../config/env.configs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfigs.jwt.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const { email, passwordUpdatedAt } = payload;

    if (!email || !passwordUpdatedAt) {
      this.logger.error(`Invalid token payload: ${JSON.stringify(payload)}`);
      throw new UnauthorizedException();
    }

    return payload;
  }
}
