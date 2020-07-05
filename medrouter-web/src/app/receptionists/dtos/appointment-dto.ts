import { Available } from "../enums/hours.enum";
import { AppointmentStatus } from "../enums/appontment-status";
import { Specialty } from "../enums/specialtys";

export class Appointment {
  id: string;
  client: {
    id: string;
    user: {
      username: string;
      fullname: string;
      surname: string;
      avatar: {
        url: string;
      };
    };
  };

  doctor: {
    id: string;
    specialty: Specialty[];
    user: {
      username: string;
      fullname: string;
      surname: string;
      avatar: {
        url: string;
      };
    };
  };

  date: Date;

  hour: Available;

  status: AppointmentStatus;
}
