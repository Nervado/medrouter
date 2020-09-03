import { Available } from 'src/doctors/enums/available.enum';
import { IsDateString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { AppointmentStatus } from '../enums/appointment.enum';
import { Specialty } from 'src/doctors/enums/specialty.enum';

export class AppointmentDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  client?: {
    id: string;
    user: {
      username: string;
      fullname: string;
      surname: string;
      avatar: {
        url: string;
      };
    };
  };

  @IsNotEmpty()
  doctor: {
    id: string;
    specialty: Specialty[];
    user: {
      username: string;
      fullname: string;
      surname: string;
      avatar: {
        url: string;
      };
    };
  };

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  hour: Available;

  status: AppointmentStatus;
}
