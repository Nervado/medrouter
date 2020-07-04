import { Available } from 'src/doctors/enums/available.enum';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class AppointmentDto {
  @IsNotEmpty()
  client: {
    id: string;
  };

  @IsNotEmpty()
  doctor: {
    id: string;
  };

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  hour: Available;
}
