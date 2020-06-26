export class ScheduleDto {
  id?: string;
  date: Date;
  availablehours: string[];
  check?: boolean[];
}
