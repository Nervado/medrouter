import { Available } from 'src/doctors/enums/available.enum';

export function getMidnight(date: Date): Date {
  return new Date(new Date(date).setHours(0, 0, 0, 0));
}

export function isPast(date: Date, hour: Available): boolean {
  const now = new Date();
  const h: number = parseInt(hour.split(':')[0]);
  const m: number = parseInt(hour.split(':')[1]);
  const check = new Date(new Date(date).setHours(h, m, 0, 0));

  console.log(now, check);

  if (now.getTime() > check.getTime()) {
    return true;
  } else {
    return false;
  }
}

export function getFullHour(date: Date): Available {
  return Available[
    `H${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}`
  ];
}
