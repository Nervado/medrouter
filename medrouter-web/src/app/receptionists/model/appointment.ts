import { AppointmentStatus } from "../enums/appontment-status";
import { Client } from "./client";
import { DoctorDto } from "./doctor-dto";

export class Appointment {
  id: any;
  date: Date;
  hour: string;
  status?: AppointmentStatus;
  client?: Client;
  doctor?: DoctorDto;
}
