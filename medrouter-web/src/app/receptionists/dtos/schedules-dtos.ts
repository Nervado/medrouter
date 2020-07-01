import { Specialty } from "../enums/specialtys";

export class SearchScheduleDto {
  date?: Date | string;
  page?: number = 1;
  username?: string;
  endDate?: Date | string;
}

export class DaySchedule {
  id?: string;
  date: Date;
  hours: Array<HourSchedule>;
}

export class HourSchedule {
  available?: boolean;
  hour: string;
  busy?: boolean;
}

export class DoctorDto {
  id: string;
  specialty: Specialty[];
  user: {
    username: string;
    surname: string;
  };
}
