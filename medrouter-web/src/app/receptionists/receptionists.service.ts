import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { MEDROUTER_API } from "../api/app.api";
import { SignUp } from "../auth/models/signup.model";
import { ClientDto } from "./dtos/client-dto";
import { SearchClientDto } from "./dtos/search-client-dto";
import { DocDto } from "./dtos/doc-dto";

@Injectable({
  providedIn: "root",
})
export class ReceptionistsService {
  constructor(private http: HttpClient, private as: AuthService) {}

  addClient(client: SignUp): Observable<void> {
    return this.http.post<void>(`${MEDROUTER_API}/clients`, {
      ...client,
    });
  }

  getClients(search: SearchClientDto): Observable<ClientDto[]> {
    const { page, username } = search;
    const query = username ? `&username=${username}` : "";
    return this.http.get<ClientDto[]>(
      `${MEDROUTER_API}/clients?page=${page}${query}`
    );
  }

  uploadDoc(file: any): Observable<DocDto> {
    return this.http.post<DocDto>(`${MEDROUTER_API}/docs`, file);
  }

  updateClientDoc(id: string, doc: DocDto): Observable<void> {
    return this.http.patch<void>(`${MEDROUTER_API}/clients/${id}`, { ...doc });
  }

  updateClientStatus(id: string, checked: boolean): Observable<void> {
    return this.http.patch<void>(`${MEDROUTER_API}/clients/${id}/status`, {
      checked,
    });
  }
}
