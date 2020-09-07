import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
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
import { SearchFilterDto } from './dto/search-filter.dto';

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Allow('client', 'admin')
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(
    @Query(ValidationPipe) pageFilterDto: PageFilterDto,
    @GetUser() user: User,
  ): Promise<User[]> {
    return this.usersService.index(pageFilterDto);
  }

  @Get('/search')
  @Roles('client')
  @UseInterceptors(ClassSerializerInterceptor)
  getUserByName(
    @Query(ValidationPipe) searchFilterDto: SearchFilterDto,
  ): Promise<User[]> {
    return this.usersService.find(searchFilterDto);
  }

  @Get('/:id')
  @Roles('client')
  @UseInterceptors(ClassSerializerInterceptor)
  getUser(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.get(id, user);
  }

  @Put('/:id')
  @Allow('recept', 'admin', 'owner', 'client')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
    @GetUser() loggedUser: User,
  ): Promise<User> {
    return this.usersService.update(id, body, loggedUser);
  }

  @Delete('/:id')
  @Allow('recept', 'admin', 'owner', 'client')
  deleteUser(@Param('id') id: string, @GetUser() loggedUser: User) {
    return this.usersService.deleteOne(id, loggedUser);
  }
}
