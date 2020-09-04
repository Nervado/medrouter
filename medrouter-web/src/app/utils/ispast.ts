import { Available } from "../clients/models/available.enum";

export function isPast(date: Date, hour?: Available): boolean {
  const now = new Date();
  const h: number = hour ? parseInt(hour.split(":")[0]) : 0;
  const m: number = hour ? parseInt(hour.split(":")[1]) : 0;
  const check = new Date(new Date(date).setHours(h, m, 0, 0));

  if (now.getTime() > check.getTime()) {
    return true;
  } else {
    return false;
  }
}
