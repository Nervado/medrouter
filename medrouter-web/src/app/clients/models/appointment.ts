import { AppointmentStatus } from "../enums/appontment-status";
import { Client } from "./client";
import { Available } from "./available.enum";
import { Doctor } from "./doctor";

export class Appointment {
  id: any;
  date: Date;
  hour: string;
  status: AppointmentStatus;
  client?: Client;
  doctor?: Doctor;
  hours?: Available[];
}
