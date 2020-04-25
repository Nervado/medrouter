import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  Render,
} from '@nestjs/common';
import { AuthSingUpDto } from './dto/auth-signup.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/auth-login.dto';
import { CredentailsDto } from './dto/auth-credentials.dto';
import { UserDto } from '../users/dto/user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  signUp(@Body() authSingUpDto: AuthSingUpDto): Promise<UserDto> {
    return this.authService.signUp(authSingUpDto);
  }

  @Post('/signin')
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  signIn(@Body() loginDto: LoginDto): Promise<CredentailsDto> {
    return this.authService.signIn(loginDto);
  }

  @Get('/confirmation/:token')
  @Render('confirmation')
  emailConfirmation(@Param('token') token: string): any {
    return this.authService.confirmEmail(token);
  }
}
