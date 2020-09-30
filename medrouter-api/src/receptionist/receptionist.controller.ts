import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  ValidationPipe,
  Query,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { ReceptionistService } from './receptionist.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';
import { Allow } from 'src/auth/decorators/alow.decorator';
import { ReceptionistDto } from './dto/receptionist.dto';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';
import { Receptionist } from './models/receptionist.entity';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
@Controller('receptionists')
export class ReceptionistController {
  constructor(private receptionistService: ReceptionistService) {}

  @Post()
  @Allow('manager', 'owner')
  @UseInterceptors(ClassSerializerInterceptor)
  createDoctor(
    @Body(ValidationPipe) body: ReceptionistDto,
  ): Promise<Receptionist> {
    return this.receptionistService.create(body);
  }

  @Get()
  @Allow('manager', 'owner')
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(
    @Query(ValidationPipe) search: SearchFilterDto,
  ): Promise<Receptionist[]> {
    return this.receptionistService.getAll(search);
  }

  @Get('/:id')
  @Roles('recept')
  @UseInterceptors(ClassSerializerInterceptor)
  get(@GetUser() user: User, @Param('id') id: string): Promise<Receptionist> {
    return this.receptionistService.getOne(id, user);
  }

  @Patch('/:id/status')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatus(
    @Param('id') id: string,
    @Body('status', ValidationPipe) body: any,
  ) {
    return this.receptionistService.modifyOne(id, body, 'status');
  }

  @Patch('/:id/diff')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeSalary(
    @Param('id') id: string,
    @Body('diff', ValidationPipe) body: ReceptionistDto,
  ): Promise<Receptionist> {
    return this.receptionistService.modifyOne(id, body, 'diff');
  }

  @Delete('/:id')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  dismiss(@Param('id') id: string) {
    return this.receptionistService.delete(id);
  }
}
