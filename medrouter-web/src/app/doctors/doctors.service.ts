import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MEDICINES_API, MEDROUTER_API } from "../api/app.api";
import { Observable } from "rxjs";
import { ScheduleDto } from "./dtos/schedule-dto";
import { DoctorDto } from "./model/doctor-dto";
import { AuthService } from "../auth/auth.service";
import { DaySchedule } from "./model/schedule";
import { SearchScheduleDto } from "./dtos/searchSchedule.dto";
import { Appointment } from "./model/appointment";
import { SearchAppointmentsDto } from "./dtos/search-appointments-dto";
import { Client } from "./model/client";
import { ExamDto } from "./model/exam";
import { Medicine } from "./model/medicine";
import { PrescriptionDto } from "./model/prescription";

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

  patchSchedules(id: string, schedules: ScheduleDto[]): Observable<void> {
    return this.http.patch<void>(`${MEDROUTER_API}/doctors/${id}/schedules`, {
      schedules: schedules,
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

  getAppointments(
    id: string,
    search: SearchAppointmentsDto
  ): Observable<Appointment[]> {
    const query = search.clientname ? `&clientname=${search.clientname}` : "";
    return this.http.get<Appointment[]>(
      `${MEDROUTER_API}/doctors/${id}/appointments?date=${search.date}${query}`
    );
  }
  getAppointment(
    doctorId: string,
    appointmentId: string
  ): Observable<Appointment> {
    return this.http.get<Appointment>(
      `${MEDROUTER_API}/doctors/${doctorId}/appointments/${appointmentId}`
    );
  }

  getClients(doctorId: string, username: string): Observable<Client[]> {
    return this.http.get<Client[]>(
      `${MEDROUTER_API}/doctors/${doctorId}/clients?username=${username}`
    );
  }

  getExams(id: string, search: any): Observable<ExamDto[]> {
    const { page, username } = search;
    const query = username ? `&username=${username}` : "";
    return this.http.get<ExamDto[]>(
      `${MEDROUTER_API}/doctors/${id}/exams/page=${page}${query}`
    );
  }

  createExam(exam: ExamDto): Observable<void> {
    return this.http.post<void>(`${MEDROUTER_API}/exams`, { ...exam });
  }

  modifyExam(id: string, exam: ExamDto): Observable<void> {
    return this.http.patch<void>(`${MEDROUTER_API}/exams/${id}/status`, {
      ...exam,
    });
  }

  deleteExam(id: string): Observable<void> {
    return this.http.delete<void>(`${MEDROUTER_API}/exams/${id}`);
  }

  createMedicine(medicine: Medicine): Observable<void> {
    return this.http.post<void>(`${MEDROUTER_API}/medicines`, { ...medicine });
  }

  deleteMedicine(id: string): Observable<void> {
    return this.http.delete<void>(`${MEDROUTER_API}/medicines/${id}`);
  }

  createPrescription(
    id: string,
    prescription: PrescriptionDto
  ): Observable<{
    id: string;
  }> {
    return this.http.post<{
      id: string;
    }>(`${MEDROUTER_API}/doctors/${id}/prescriptions`, { ...prescription });
  }

  getPrescriptions(id: string, search: any): Observable<PrescriptionDto[]> {
    const { username, page } = search;
    const query = username ? `&username=${username}` : "";
    return this.http.get<PrescriptionDto[]>(
      `${MEDROUTER_API}/doctors/${id}/prescriptions?page=${page}${query}`
    );
  }

  updatePrescription(
    doctorId: string,
    id: string,
    body: PrescriptionDto
  ): Observable<void> {
    return this.http.put<void>(
      `${MEDROUTER_API}/doctors/${doctorId}/prescriptions/${id}`,
      { ...body }
    );
  }

  getPrescription(doctorId: string, id: string): Observable<PrescriptionDto> {
    return this.http.get<PrescriptionDto>(
      `${MEDROUTER_API}/doctors/${doctorId}/prescriptions/${id}`
    );
  }
}
