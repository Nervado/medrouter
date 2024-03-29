import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Body,
  ValidationPipe,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ClientDto } from './dtos/cliente-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ClientService } from './client.service';
import { AuthSingUpDto } from 'src/auth/dto/auth-signup.dto';
import { SearchClientDto } from './dtos/search-client-dto';
import { SearchResultDto } from './dtos/search-result-dto';

import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { Allow } from 'src/auth/decorators/alow.decorator';
import { DocDto } from 'src/docs/dto/doc.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Client } from './models/client.entity';
import { AppointmentDto } from 'src/appointments/dto/appointment.dto';
import { ExamDto } from 'src/exams/dto/exam.dto';
import { PrescriptionDto } from 'src/prescriptions/dto/prescription.dto';
import { DataGraph } from './dtos/data-graph';

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  @Roles(Role.RECEPT)
  @UseInterceptors(ClassSerializerInterceptor)
  createCliente(@Body(ValidationPipe) body: AuthSingUpDto): Promise<ClientDto> {
    return this.clientService.create(body);
  }

  @Get()
  @Roles(Role.RECEPT)
  getClients(@Query() search: SearchClientDto): Promise<SearchResultDto[]> {
    return this.clientService.getAll(search);
  }

  @Get('/:id')
  @Allow(Role.RECEPT, Role.CLIENT)
  @UseInterceptors(ClassSerializerInterceptor)
  get(@GetUser() user: User, @Param('id') id: string): Promise<Client> {
    return this.clientService.getOne(id, user);
  }

  @Get('/:id/reports')
  @Allow(Role.CLIENT)
  @UseInterceptors(ClassSerializerInterceptor)
  getReports(@GetUser() user: User, @Param('id') id: any): Promise<DataGraph> {
    return this.clientService.getPressureReport(id, user);
  }

  @Get('/:id/appointments')
  @Allow(Role.CLIENT)
  @UseInterceptors(ClassSerializerInterceptor)
  getClientAppointments(
    @GetUser() user: User,
    @Param('id') id: any,
    @Query() search: SearchClientDto,
  ): Promise<AppointmentDto[]> {
    return this.clientService.searchClientActiveAppointments(id, user, search);
  }

  @Get('/:id/exams')
  @Allow(Role.CLIENT)
  @UseInterceptors(ClassSerializerInterceptor)
  getClientExams(
    @GetUser() user: User,
    @Param('id') id: any,
    @Query() search: SearchClientDto,
  ): Promise<ExamDto[]> {
    return this.clientService.searchClientExams(id, user, search);
  }

  @Get('/:id/prescriptions')
  @Allow(Role.CLIENT)
  @UseInterceptors(ClassSerializerInterceptor)
  getClientPrescriptions(
    @GetUser() user: User,
    @Param('id') id: any,
    @Query() search: SearchClientDto,
  ): Promise<PrescriptionDto[]> {
    return this.clientService.searchClientPrescriptions(id, user, search);
  }

  @Delete('/:id/appointments/:appId')
  @Allow(Role.CLIENT)
  @UseInterceptors(ClassSerializerInterceptor)
  cancelAppointment(
    @GetUser() user: User,
    @Param('id') id: string,
    @Param('appId') appId: string,
  ): Promise<void> {
    return this.clientService.cancelAppointment(id, appId, user);
  }

  @Patch('/:id')
  @Allow(Role.RECEPT, Role.CLIENT)
  @UseInterceptors(ClassSerializerInterceptor)
  updateDoc(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() body: DocDto,
  ): Promise<void> {
    return this.clientService.updateDoc(id, user, body);
  }

  @Patch('/:id/status')
  @Allow(Role.RECEPT)
  @UseInterceptors(ClassSerializerInterceptor)
  updateStatus(
    @Param('id') id: string,
    @Body('checked') checked: boolean,
  ): Promise<void> {
    return this.clientService.updateStatus(id, checked);
  }
}
