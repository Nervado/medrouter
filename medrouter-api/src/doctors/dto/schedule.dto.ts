import { Available } from '../enums/available.enum';
import { DoctorDto } from './doctor.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { Specialty } from '../enums/specialty.enum';

export class ScheduleDto {
  id?: string;
  date?: Date;
  availablehours?: Available[];
  check?: boolean[];
  hours?: Array<{
    hour: Available;
    busy: boolean;
  }>;
  doctor?: {
    id: string;
    specialty?: Specialty[];
    user?: {
      username?: string;
      fullname?: string;
      surname?: string;
      avatar?: {
        url?: string;
      };
    };
  };
}

export class Schedules {
  schedules: ScheduleDto[];
}
