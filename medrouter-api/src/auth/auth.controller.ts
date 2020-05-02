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
  Patch,
} from '@nestjs/common';
import { AuthSingUpDto } from './dto/auth-signup.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/auth-login.dto';
import { CredentailsDto } from './dto/auth-credentials.dto';
import { UserDto } from '../users/dto/user-dto';
import { AuthPasswordChange } from './dto/auth-password-change.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  signUp(@Body() authSingUpDto: AuthSingUpDto): Promise<UserDto> {
    return this.authService.signUp(authSingUpDto);
  }

  @Patch('/signup')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  patch(
    @Body() body: AuthPasswordChange,
    @GetUser() user: User,
  ): Promise<CredentailsDto> {
    console.log('change password', body);
    return this.authService.changePassword(body, user);
  }

  @Post('/signin')
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  signIn(@Body() loginDto: LoginDto): Promise<CredentailsDto> {
    console.log(loginDto);

    return this.authService.signIn(loginDto);
  }

  @Get('/confirmation/:token')
  @Render('confirmation')
  emailConfirmation(@Param('token') token: string): any {
    return this.authService.confirmEmail(token);
  }
}
