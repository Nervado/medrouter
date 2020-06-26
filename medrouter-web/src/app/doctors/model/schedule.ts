import { HourSchedule } from "./schedule-hour";

export class DaySchedule {
  id?: string;
  date: Date;
  hours: Array<HourSchedule>;
}
