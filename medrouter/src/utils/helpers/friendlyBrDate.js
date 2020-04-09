import { toDate } from 'date-fns-tz';
import { months } from './calendarConstants';

export function prettyDate(dirty) {
  if (!dirty) {
    return '';
  }
  const date = toDate(dirty);
  return `${date.getDate()} de ${
    months[date.getMonth()]
  } de ${date.getFullYear()}`;
}
