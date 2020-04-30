import { Data } from "../shared/components/datepicker/models/datepicker.model";

export function setDateModel(date: Date): Data {
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
}
