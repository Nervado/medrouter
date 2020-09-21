import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { configService } from '../config/config.service';
import { UsersService } from '../users/users.service';
import { InfoToken } from './dto/info-token.dto';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(
  Strategy,
  'websocketStrategy',
) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('wsJwtToken'),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtConfig().secret,
    });
  }

  async validate(payload: InfoToken) {
    const { email } = payload;

    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('User not authorized by ws-guard');
    }

    return user;
  }
}
