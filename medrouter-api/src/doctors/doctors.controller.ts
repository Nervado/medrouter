import {
  Controller,
  Body,
  Post,
  Put,
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
import { DoctorsService } from './doctors.service';
import { DoctorDto } from './dto/doctor.dto';
import { Doctor } from './models/doctor.entity';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';
import { Schedule } from './models/schedule.entity';
import { ScheduleDto, Schedules } from './dto/schedule.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { Allow } from 'src/auth/decorators/alow.decorator';
import { SearchScheduleDto } from './dto/searchSchedule.dto';

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorsService) {}

  @Post()
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  createDoctor(@Body(ValidationPipe) body: DoctorDto): Promise<Doctor> {
    return this.doctorService.create(body);
  }

  @Get()
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(@Query(ValidationPipe) search: SearchFilterDto): Promise<Doctor[]> {
    return this.doctorService.getAll(search);
  }

  @Get('/:id')
  @Roles('doctor')
  @UseInterceptors(ClassSerializerInterceptor)
  get(@GetUser() user: User, @Param('id') id: string): Promise<Doctor> {
    return this.doctorService.getOne(id, user);
  }

  @Put('/:id')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id') id: string,
    @Body('specialty', ValidationPipe) body: DoctorDto,
  ) {
    return this.doctorService.updateOne(id, body);
  }

  @Patch('/:id/status')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatus(
    @Param('id') id: string,
    @Body('status', ValidationPipe) body: DoctorDto,
  ): Promise<Doctor> {
    return this.doctorService.modifyOne(id, body, 'status');
  }

  @Patch('/:id/diff')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeSalary(
    @Param('id') id: string,
    @Body('diff', ValidationPipe) body: DoctorDto,
  ): Promise<Doctor> {
    return this.doctorService.modifyOne(id, body, 'diff');
  }

  @Delete('/:id')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  deleteDoctor(@Param('id') id: string) {
    return this.doctorService.delete(id);
  }

  @Get('/:id/schedules')
  @Allow('doctor', 'recept')
  @UseInterceptors(ClassSerializerInterceptor)
  getSchedule(
    @Param('id') id: string,
    @Query(ValidationPipe) search: SearchScheduleDto,
  ): Promise<ScheduleDto[]> {
    console.log(search);

    return this.doctorService.getSchedules(id, search);
  }

  @Post('/:id/schedules')
  @Roles('doctor')
  @UseInterceptors(ClassSerializerInterceptor)
  createSchedule(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body(ValidationPipe) body: Schedules,
  ): Promise<Schedule[]> {
    return this.doctorService.createSchedule(body, id, user);
  }
}
