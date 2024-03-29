import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Doctor } from "./models/doctor";
import { MEDROUTER_API } from "../api/app.api";
import { AuthService } from "../auth/auth.service";
import { Data } from "./interfaces/data";
import { SearchDoctorDto } from "./models/search";
import { isThisHour } from "date-fns";
import { Appointment } from "./models/appointment";
import { ExamDto } from "./models/exam";
import { DataGraph } from "./models/data-graph";

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  search(search: SearchDoctorDto): Observable<Array<Doctor>> {
    const { page, username } = search;

    const query = username ? `&username=${username}` : "";

    return this.http.get<Array<Doctor>>(
      `${MEDROUTER_API}/doctors?page=${page}${query}`
    );
  }

  getFreeSchedules(id: string, date: string): Observable<any> {
    return this.http.get<any>(
      `${MEDROUTER_API}/doctors/${id}/free-schedules?date=${date}`
    );
  }

  requestAppointment(app: Appointment): Observable<void> {
    return this.http.post<void>(`${MEDROUTER_API}/appointments`, app);
  }

  getAppointments(
    id: string,
    search: SearchDoctorDto
  ): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${MEDROUTER_API}/clients/${id}/appointments?page=${search.page}`
    );
  }

  getPrescriptions(
    id: string,
    search: SearchDoctorDto
  ): Observable<Appointment[]> {
    const { page, username } = search;

    const query = username ? `&username=${username}` : "";

    return this.http.get<Appointment[]>(
      `${MEDROUTER_API}/clients/${id}/prescriptions?page=${page}${query}`
    );
  }

  deleteAppointment(id: string, appId: string): Observable<void> {
    return this.http.delete<void>(
      `${MEDROUTER_API}/clients/${id}/appointments/${appId}`
    );
  }

  getExams(id: string, search: SearchDoctorDto): Observable<ExamDto[]> {
    const { page, username } = search;
    const query = username ? `&username=${username}` : "";

    return this.http.get<ExamDto[]>(
      `${MEDROUTER_API}/clients/${id}/exams?page=${page}${query}`
    );
  }

  getDataGraph(id: string): Observable<DataGraph> {
    return this.http.get<DataGraph>(`${MEDROUTER_API}/clients/${id}/reports`);
  }
}
