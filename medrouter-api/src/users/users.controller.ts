import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PageFilterDto } from './dto/page-filter.dto';
import { User } from './models/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
import { GetUser } from '../users/decorators/get-user.decorator';

import { Roles } from '../auth/decorators/roles.decorator';
import { Allow } from '../auth/decorators/alow.decorator';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Get()
  @Allow('client', 'admin')
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(
    @Query(ValidationPipe) pageFilterDto: PageFilterDto,
    @GetUser() user: User,
  ): Promise<User[]> {
    console.log('logged User', user);
    return this.usersService.index(pageFilterDto);
  }

  @Get('/:id')
  @Roles('client')
  @UseInterceptors(ClassSerializerInterceptor)
  getUser(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    // this.logger.verbose(`User ${user.userId} attempt to get profile data...`);
    return this.usersService.get(id, user);
  }

  @Put('/:id')
  @Roles('client')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserUpdateDto,
    @GetUser() loggedUser: User,
  ): Promise<User> {
    return this.usersService.update(id, body, loggedUser);
  }

  @Delete('/:id')
  @Allow('recept', 'admin', 'owner')
  deleteUser(@Param('id') id: number, @GetUser() loggedUser: User) {
    return this.usersService.deleteOne(id, loggedUser);
  }
}
