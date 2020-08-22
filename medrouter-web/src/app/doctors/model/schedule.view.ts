import { HourSchedule } from "./schedule-hour";

export class EscheduleView {
  id?: string;
  date: Date;
  name: string;
  day: number;
  hours: HourSchedule[];
}
