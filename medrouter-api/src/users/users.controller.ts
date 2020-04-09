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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PageFilterDto } from './dto/page-filter.dto';
import { User } from './models/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
import { GetUser } from '../users/decorators/get-user.decorator';

import { Roles } from '../auth/decorators/roles.decorator';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('admin')
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(
    @Query(ValidationPipe) pageFilterDto: PageFilterDto,
    @GetUser() user: User,
  ): Promise<User[]> {
    this.logger.verbose(`User "${JSON.stringify(user)}" retrieving all users`);
    return this.usersService.index(pageFilterDto);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getUser(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    // this.logger.verbose(`User ${user.userId} attempt to get profile data...`);
    return this.usersService.get(id);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserUpdateDto,
  ): Promise<User> {
    return this.usersService.update(id, body);
  }
}
