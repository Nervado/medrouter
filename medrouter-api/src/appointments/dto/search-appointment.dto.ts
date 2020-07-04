import { Available } from 'src/doctors/enums/available.enum';

export class SearchAppointment {
  id?: string;
  date?: Date;
  endDate?: Date;
  hour?: Available;
  username?: string;
}
