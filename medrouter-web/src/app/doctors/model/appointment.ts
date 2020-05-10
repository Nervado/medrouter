import { AppointmentStatus } from "../enums/appontment-status";
import { Client } from "./client";

export class Appointment {
  id: any;
  date: Date;
  hour: string;
  status: AppointmentStatus;
  client: Client;
}
