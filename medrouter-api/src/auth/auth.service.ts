import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthSingUpDto } from './dto/auth-signup.dto';

import { JwtPayload } from './jwt-payload.interface';
import { CredentailsDto } from './dto/auth-credentials.dto';

import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user-dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(authSingUpDto: AuthSingUpDto): Promise<UserDto> {
    return this.userService.signUp(authSingUpDto);
  }

  async signIn(loginDto: any): Promise<CredentailsDto> {
    const user = await this.userService.validateUser(loginDto);

    const {
      username,
      userId,
      email,
      client,

      admin,
      recept,
      doctor,
      owner,
    } = user;

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      username,
      userId,
      email,

      client,
      admin,
      recept,
      doctor,
      owner,
    };

    const accessToken = await this.jwtService.sign(payload);

    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    const authCredentailsDto = new CredentailsDto();

    authCredentailsDto.token = accessToken;
    authCredentailsDto.user = {
      username,
      userId,
      email,
      client,
      admin,
      recept,
      doctor,
      owner,
    };

    return authCredentailsDto;
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }

  async validateUser(incomingData: any): Promise<any> {
    return await this.userService.validateUser(incomingData);
  }
}
