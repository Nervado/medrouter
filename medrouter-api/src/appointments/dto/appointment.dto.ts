import { Available } from 'src/doctors/enums/available.enum';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { AppointmentStatus } from '../enums/appointment.enum';

export class AppointmentDto {
  @IsNotEmpty()
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

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  hour: Available;

  status: AppointmentStatus;
}
