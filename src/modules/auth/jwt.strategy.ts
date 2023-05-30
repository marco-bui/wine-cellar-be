import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../common/services/config.service';
import { Roles } from '../../database/models/entities';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

export interface JwtPayload {
  id: string;
  email: string;
  phone: string;
  role: Roles;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.id,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
    };
  }
}
