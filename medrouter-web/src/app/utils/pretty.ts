import { format, addDays, parseISO } from "date-fns";

export function pretty(date: Date, diff?: number): string {
  if (diff && diff > 0) {
    return format(addDays(new Date(), diff), "dd/MM/yyyy");
  } else {
    return format(parseISO(date.toString()), "dd/MM/yyyy");
  }
}
