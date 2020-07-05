import { Available } from "../enums/available.enum";

export class SearchAppointmentsDto {
  date: Date | string;
  endDate?: Date | string;
  hour?: Available;
  username?: string;
  clientname?: string;
  id?: string;
}
