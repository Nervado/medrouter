import { Available } from "../enums/hours.enum";
import { AppointmentStatus } from "../enums/appontment-status";

export class Appointment {
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
