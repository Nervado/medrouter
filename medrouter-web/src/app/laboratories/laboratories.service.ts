import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MEDROUTER_API } from "../api/app.api";
import { ExamStatusDto } from "./dtos/exam-status.dto";
import { ExamDto } from "../doctors/model/exam";
import { SearchClientDto } from "./dtos/search-client.dto";
import { Client } from "../clients/models/client";
import { DocDto } from "../receptionists/dtos/doc-dto";

@Injectable({
  providedIn: "root",
})
export class LaboratoriesService {
  private api = `${MEDROUTER_API}`;

  constructor(private http: HttpClient) {}

  changeStatus(id: string, statusDto: ExamStatusDto): Observable<void> {
    return this.http.patch<void>(this.api + `/exams/${id}`, statusDto);
  }

  deleteResult(id: string, type: boolean): Observable<void> {
    if (type) {
      return this.http.delete<void>(this.api + `/docs/${id}`); // type = 1, pdf
    } else {
      return this.http.delete<void>(this.api + `/photos/${id}`); //type = 0, photo
    }
  }

  uploadPdfOrPhoto(file: FormData, type: boolean): Observable<DocDto> {
    if (type) {
      return this.http.post<DocDto>(this.api + `/docs`, file); //type = 1, pdf
    } else {
      return this.http.post<DocDto>(this.api + `/photos`, file); //type = 0, photo
    }
  }

  getExams(id: string, search: SearchClientDto): Observable<ExamDto[]> {
    const { page, username } = search;
    const query = username ? `&username=${username}` : "";

    return this.http.get<ExamDto[]>(
      this.api + `/labs/${id}/exams?page=${page}${query}`
    );
  }

  getClients(id: string, search: SearchClientDto): Observable<Client[]> {
    const { page, username } = search;
    const query = username ? `&username=${username}` : "";

    return this.http.get<Client[]>(
      `${MEDROUTER_API}/labs/${id}/clients?page=${page}${query}`
    );
  }

  // ok
  getByCode(code: string): Observable<ExamDto> {
    return this.http.get<ExamDto>(this.api + `/exams/${code}`);
  }

  updateExamDocuments(id: string, exam: ExamDto): Observable<void> {
    return this.http.put<void>(this.api + `/exams/${id}`, exam);
  }
}
