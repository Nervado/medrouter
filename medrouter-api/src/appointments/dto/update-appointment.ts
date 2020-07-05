import { AppointmentStatus } from '../enums/appointment.enum';
import { Available } from 'src/doctors/enums/available.enum';
import { IsOptional, IsEnum, IsDate, IsDateString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsEnum(AppointmentStatus, { each: true })
  status: AppointmentStatus;

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsEnum(Available, { each: true })
  hour?: Available;
}
