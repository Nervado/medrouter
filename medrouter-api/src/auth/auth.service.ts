import {
  Injectable,
  UnauthorizedException,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthSingUpDto } from './dto/auth-signup.dto';

import * as bcrypt from 'bcrypt';

import { JwtPayload } from './jwt-payload.interface';
import { CredentailsDto } from './dto/auth-credentials.dto';

import { UsersService } from '../users/users.service';
import { configService } from '../config/config.service';

import { UserDto } from '../users/dto/user-dto';
import * as Redis from 'ioredis';
import { AuthPasswordChange } from './dto/auth-password-change.dto';
import { User } from 'src/users/models/user.entity';
import { LoginDto } from './dto/auth-login.dto';
import { generatePass } from 'src/utils/hash-pass';

@Injectable()
export class AuthService {
  private redisConfig = configService.getRedisConfig();
  private redis = new Redis(
    parseInt(this.redisConfig.port),
    this.redisConfig.host,
  );

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

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAccessToken(user);
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }

  async validateUser(incomingData: any): Promise<any> {
    return await this.userService.validateUser(incomingData);
  }

  async confirmEmail(token: string) {
    try {
      const userId = await this.redis.get(token); // retrive value from redis

      this.redis.del(token);

      //this.logger.warn(`${userId} ${token}`);

      const { username } = await this.userService.setRole(userId, 'client');

      const data = { username }; // retrive username

      return { data };
    } catch (error) {
      throw new InternalServerErrorException('Uknow user', error);
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException('Not possible');

    const password = generatePass();
    const passwordConfirmation = password;

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Not possible save user');
    }

    const { username } = user;

    try {
      await this.userService.signUp(
        { username, email, password, passwordConfirmation },
        true,
        user,
      );
    } catch (error) {
      throw new InternalServerErrorException('Fail at retrive password', error);
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async changePassword(
    body: AuthPasswordChange,
    user: User,
  ): Promise<CredentailsDto> {
    const login = new LoginDto();

    //console.log(user);

    login.password = body.password;
    login.username = user.email;

    const search = await this.userService.validateUser(login);

    if (!search || user.userId !== search.userId) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // now can change password
    const altereduser = await this.userService.changePassword(body, user);

    // set new token
    return await this.generateAccessToken(altereduser);
  }

  async generateAccessToken(user: User): Promise<CredentailsDto> {
    const { username, userId, email, role, avatar } = user;

    const payload: JwtPayload = {
      username,
      userId,
      email,
      role,
    };

    const accessToken = await this.jwtService.sign(payload);

    // this.logger.debug(
    // `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    //);

    const authCredentailsDto = new CredentailsDto();

    authCredentailsDto.token = accessToken;
    authCredentailsDto.user = {
      username,
      userId,
      email,
      role,
      avatar,
    };

    return authCredentailsDto;
  }
}
