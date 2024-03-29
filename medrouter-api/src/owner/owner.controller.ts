import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerDto } from './dtos/owner-dto';
import { Owner } from './models/owner.entity';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Allow } from 'src/auth/decorators/alow.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { TotalDto } from './dtos/total.dto';
import { StatsDto } from './dtos/stats.dto';

@UseGuards(JwtAuthGuard, AlowGuard, RolesGuard)
@Controller('owners')
export class OwnerController {
  constructor(private readonly os: OwnerService) {}

  @Post()
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body(ValidationPipe) body: OwnerDto): Promise<Owner> {
    return this.os.create(body);
  }

  @Get()
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(@Query(ValidationPipe) search: SearchFilterDto): Promise<Owner[]> {
    return this.os.getAll(search);
  }

  @Get('/:id')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  get(@GetUser() user: User, @Param('id') id: string): Promise<Owner> {
    return this.os.getOne(id, user);
  }

  @Patch('/:id/status')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatus(
    @Param('id') id: string,
    @Body('status', ValidationPipe) body: OwnerDto,
  ): Promise<Owner> {
    return this.os.modifyOne(id, body, 'status');
  }

  @Patch('/:id/diff')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeSalary(
    @Param('id') id: string,
    @Body('diff', ValidationPipe) body: OwnerDto,
  ): Promise<Owner> {
    return this.os.modifyOne(id, body, 'diff');
  }

  @Delete('/:id')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  dismiss(@Param('id') id: string): Promise<void> {
    return this.os.deleteOne(id);
  }

  @Get('/:id/totals')
  @Roles('owner')
  getTotals(@Param('id') id: string, @GetUser() user: User): Promise<TotalDto> {
    return this.os.getTotalizers(id, user);
  }

  @Get('/:id/stats')
  @Roles('owner')
  getStats(@Param('id') id: string, @GetUser() user: User): Promise<StatsDto> {
    return this.os.getStats(id, user);
  }
}
