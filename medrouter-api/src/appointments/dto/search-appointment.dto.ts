import { Available } from 'src/doctors/enums/available.enum';

export class SearchAppointment {
  doctorId: string;
  date: Date;
  hour: Available;
}
