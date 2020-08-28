import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MEDROUTER_API } from "../api/app.api";
import { ExamStatusDto } from "./dtos/exam-status.dto";
import { ExamDto } from "../doctors/model/exam";

@Injectable({
  providedIn: "root",
})
export class LaboratoriesService {
  private api = `${MEDROUTER_API}`;

  constructor(private http: HttpClient) {}

  changeStatus(id: string, statusDto: ExamStatusDto): Observable<void> {
    return this.http.patch<void>(this.api + `/exams/${id}`, statusDto);
  }

  deleteResult(id: string): Observable<void> {
    return this.http.delete<void>(this.api + `/docs/${id}`);
  }

  uploadResult(file: Blob): Observable<void> {
    return this.http.post<void>(this.api + `/docs`, file);
  }

  getExams(page: number, username?: string): Observable<ExamDto[]> {
    const query = username ? `&username=${username}` : "";
    return this.http.get<ExamDto[]>(this.api + `/exams?page=${page}${query}`);
  }

  getByCode(code: string): Observable<ExamDto> {
    return this.http.get<ExamDto>(this.api + `/exams/${code}`);
  }
}
