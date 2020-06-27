import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MEDICINES_API, MEDROUTER_API } from "../api/app.api";
import { Observable } from "rxjs";
import { ScheduleDto } from "./dtos/schedule-dto";
import { DoctorDto } from "./model/doctor-dto";
import { AuthService } from "../auth/auth.service";
import { DaySchedule } from "./model/schedule";
import { SearchScheduleDto } from "./dtos/searchSchedule.dto";

@Injectable({
  providedIn: "root",
})
export class DoctorsService {
  doctor: DoctorDto;

  constructor(private http: HttpClient, private as: AuthService) {}
  searchMedicine(medicine: string): Observable<any> {
    return this.http.post(`${MEDICINES_API}`, {
      query: {
        wildcard: {
          product: `*${medicine}*`,
        },
      },
    });
  }

  createSchedule(
    id: string,
    schedules: ScheduleDto[]
  ): Observable<ScheduleDto[]> {
    return this.http.post<ScheduleDto[]>(
      `${MEDROUTER_API}/doctors/${id}/schedules`,
      {
        schedules: schedules,
      }
    );
  }

  get(): Observable<DoctorDto> {
    return this.http.get<DoctorDto>(
      `${MEDROUTER_API}/doctors/${this.as.user.user.userId}`
    );
  }

  setDoctor(doctor: DoctorDto) {
    this.doctor = doctor;
  }

  getSchedules(
    id: string,
    search: SearchScheduleDto
  ): Observable<DaySchedule[]> {
    const { date, endDate, username } = search;

    let query = endDate ? `&endDate=${endDate}` : "";
    query = username ? query + `&username=${username}` : query;

    return this.http.get<DaySchedule[]>(
      `${MEDROUTER_API}/doctors/${id}/schedules?date=${date}${query}`
    );
  }
}
