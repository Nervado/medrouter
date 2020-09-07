import { Available } from '../enums/available.enum';
import { DoctorDto } from './doctor.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { Specialty } from '../enums/specialty.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleDto {
  id?: string;
  date?: Date;
  availablehours?: Available[];
  check?: boolean[];

  @ApiProperty({ type: () => Hour, isArray: true })
  hours?: Hour[];

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

class Hours {
  hours?: { hour: Available; busy: boolean }[];
}

class Hour {
  hour: Available;
  busy: boolean;
}
