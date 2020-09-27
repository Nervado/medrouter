import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MEDROUTER_API } from "../api/app.api";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getSpecialtys(): Observable<string[]> {
    return this.http.get<string[]>(`${MEDROUTER_API}/non-clients`);
  }

  getAvailableSchedules(available: Available): Observable<any> {
    const { year, month, specialty } = available;
    return this.http.get<any>(
      `${MEDROUTER_API}/non-clients?year=${year}&month=${month}&specialty=${specialty}`
    );
  }

  requestAppointment(requestForm: any): Observable<void> {
    return this.http.post<any>(`${MEDROUTER_API}/non-clients`, requestForm);
  }
}

export class Available {
  year: number;
  month: number;
  specialty: string;
}
