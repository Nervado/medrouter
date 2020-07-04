import { Available } from "../enums/hours.enum";

export class SearchAppointmentsDto {
  date: Date;
  hour?: Available;
  username?: string;
  id?: string;
}
