import { Available } from 'src/doctors/enums/available.enum';

export class NonClientAppointmentRequest {
  date: Date;
  email: string;
  fullname: string;
  hour: Available;
  phoneNumber: string;
  specialty: string;
}
