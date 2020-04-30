export function adjustDate(
  year: number,
  month: number,
  day: number,
  hour?: number,
  min?: number
) {
  let date = new Date();

  if (hour !== undefined && min !== undefined) {
    date.setHours(hour, min);
    date.setSeconds(0);
  }

  date.setFullYear(year, month, day);
  return date;
}
