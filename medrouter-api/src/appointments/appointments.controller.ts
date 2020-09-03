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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';
import { AppointmentDto } from './dto/appointment.dto';
import { SearchAppointment } from './dto/search-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment';
import { Allow } from 'src/auth/decorators/alow.decorator';

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private as: AppointmentsService) {}

  @Post()
  @Allow('recept', 'client')
  @UseInterceptors(ClassSerializerInterceptor)
  createDoctor(@Body(ValidationPipe) body: AppointmentDto) {
    return this.as.create(body);
  }

  @Get()
  @Roles('recept')
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(
    @Query(ValidationPipe) search: SearchAppointment,
  ): Promise<AppointmentDto[]> {
    return this.as.getAll(search);
  }

  @Get('/:id')
  @Roles('recept')
  @UseInterceptors(ClassSerializerInterceptor)
  get(@Param('id') id: string): Promise<AppointmentDto> {
    return this.as.getOne(id);
  }

  @Delete('/:id')
  @Roles('recept')
  @UseInterceptors(ClassSerializerInterceptor)
  deleteDoctor(@Param('id') id: string) {
    return this.as.delete(id);
  }

  @Patch('/:id/status')
  @Roles('recept')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatus(
    @Param('id') id: string,
    @Body(ValidationPipe) body: UpdateAppointmentDto,
  ): Promise<void> {
    return this.as.modifyOne(id, body);
  }
}
