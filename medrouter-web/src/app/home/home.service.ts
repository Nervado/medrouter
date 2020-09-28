import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MEDROUTER_API } from "../api/app.api";
import { NonClientAppointmentRequest } from "./components/appointment-form/dtos/appointment-nonclient-request.dto";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getSpecialtys(): Observable<string[]> {
    return this.http.get<string[]>(`${MEDROUTER_API}/non-clients`);
  }

  getAvailableSchedules(available: Available): Observable<AvailableHours[]> {
    const { year, month, specialty } = available;
    return this.http.get<AvailableHours[]>(
      `${MEDROUTER_API}/non-clients/schedules?year=${year}&month=${month}&specialty=${specialty}`
    );
  }

  requestAppointment(
    requestForm: NonClientAppointmentRequest
  ): Observable<void> {
    return this.http.post<void>(`${MEDROUTER_API}/non-clients`, requestForm);
  }
}

export class Available {
  year: number;
  month: number;
  specialty: string;
}

export class AvailableHours {
  day: number;
  hours: string[];
}
