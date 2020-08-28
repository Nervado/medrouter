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
  UsePipes,
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
import { SearchAppointment } from 'src/appointments/dto/search-appointment.dto';
import { AppointmentDto } from 'src/appointments/dto/appointment.dto';
import { SearchClientDto } from 'src/client/dtos/search-client-dto';
import { SearchResultDto } from 'src/client/dtos/search-result-dto';
import { PrescriptionDto } from 'src/prescriptions/dto/prescription.dto';
import { AnamnesisPipe } from 'src/prescriptions/pipes/anamnesis.pipe';
import { ExamDto } from 'src/exams/dto/exam.dto';

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
  @Allow('owner', 'recept', 'client')
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(
    @Query(ValidationPipe) search: SearchFilterDto,
    @GetUser() user: User,
  ): Promise<DoctorDto[]> {
    return this.doctorService.getAll(user, search);
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
    @Query() search: SearchScheduleDto,
  ): Promise<ScheduleDto[]> {
    return this.doctorService.getSchedules(id, search);
  }

  @Get('/:id/appointments')
  @Roles('doctor')
  @UseInterceptors(ClassSerializerInterceptor)
  getAppointments(
    @Param('id') id: string,
    @Query() search: SearchAppointment,
    @GetUser() user: User,
  ): Promise<AppointmentDto[]> {
    return this.doctorService.getAppointments(id, search, user);
  }

  @Get('/:id/clients')
  @Roles('doctor')
  @UseInterceptors(ClassSerializerInterceptor)
  getClients(
    @Param('id') id: string,
    @Query() search: SearchClientDto,
    @GetUser() user: User,
  ): Promise<SearchResultDto[]> {
    return this.doctorService.getClients(id, search, user);
  }

  @Get('/:id/appointments/:appointmentId')
  @Roles('doctor')
  @UseInterceptors(ClassSerializerInterceptor)
  getAppointment(
    @Param('id') id: string,
    @Param('appointmentId') apptId: string,
    @GetUser() user: User,
  ): Promise<AppointmentDto> {
    return this.doctorService.getAppointment(id, apptId, user);
  }

  @Post('/:id/schedules')
  @Roles('doctor')
  @UseInterceptors(ClassSerializerInterceptor)
  createSchedule(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() body: Schedules,
  ): Promise<void> {
    return this.doctorService.createSchedule(body, id, user);
  }

  @Patch('/:id/schedules')
  @Roles('doctor')
  @UseInterceptors(ClassSerializerInterceptor)
  updateSchedule(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() body: Schedules,
  ): Promise<void> {
    return this.doctorService.updateSchedules(body, id, user);
  }

  @Post('/:id/prescriptions')
  @Roles('doctor')
  createPrescription(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body(ValidationPipe) body: PrescriptionDto,
  ): Promise<{ id: string }> {
    return this.doctorService.createPrescription(id, body, user);
  }

  @Get('/:id/prescriptions/:prescriptionId')
  @Roles('doctor')
  getPrescription(
    @Param('id') id: string,
    @Param('prescriptionId') prescriptionId: string,
    @GetUser() user: User,
  ) {
    return this.doctorService.getPrescription(id, prescriptionId, user);
  }

  @Put('/:id/prescriptions/:prescriptionId')
  @Roles('doctor')
  putPrescription(
    @Param('id') id: string,
    @Param('prescriptionId') prescriptionId: string,
    @GetUser() user: User,
    @Body(new ValidationPipe({ transform: true })) body: PrescriptionDto,
  ): Promise<void> {
    return this.doctorService.updatePrescription(
      id,
      prescriptionId,
      user,
      body,
    );
  }

  @Delete('/:id/prescriptions/:prescriptionId')
  @Roles('doctor')
  deletePrescription(
    @Param('id') id: string,
    @Param('prescriptionId') prescriptionId: string,
    @GetUser() user: User,
  ) {
    return this.doctorService.deletePrescription(id, prescriptionId, user);
  }

  @Get('/:id/prescriptions')
  @Roles('doctor')
  getPrescriptions(
    @Param('id') id: string,
    @GetUser() user: User,
    @Query() search: SearchClientDto,
  ): Promise<PrescriptionDto[]> {
    return this.doctorService.findPrescriptions(id, search, user);
  }

  @Get('/:id/exams')
  @Roles('doctor')
  getExams(
    @Param('id') id: string,
    @GetUser() user: User,
    @Query() search: SearchClientDto,
  ): Promise<ExamDto[]> {
    return this.doctorService.findExams(id, search, user);
  }

  @Patch('/:id/exams/:examId')
  @Roles('doctor')
  changeStatusOfExam(
    @Param('id') id: string,
    @Param('examId') examId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.doctorService.changeExamStatus(id, examId, user);
  }
}
