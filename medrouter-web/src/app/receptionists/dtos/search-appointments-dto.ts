import { Available } from "../enums/hours.enum";

export class SearchAppointmentsDto {
  date: Date;
  endDate?: Date;
  hour?: Available;
  username?: string;
  clientname?: string;
  id?: string;
}
