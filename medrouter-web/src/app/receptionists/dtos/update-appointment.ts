import { Available } from "../enums/hours.enum";
import { AppointmentStatus } from "../enums/appontment-status";

export class UpdateAppointmentDto {
  status: AppointmentStatus;
  date?: Date;
  hour?: Available;
}
