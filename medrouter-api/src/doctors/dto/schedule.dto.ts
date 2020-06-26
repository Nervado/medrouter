import { Available } from '../enums/available.enum';

export class ScheduleDto {
  id?: string;
  date?: Date;
  availablehours?: Available[];
  check?: boolean[];
  hours?: Array<{
    hour: Available;
    busy: boolean;
  }>;
}

export class Schedules {
  schedules: ScheduleDto[];
}
