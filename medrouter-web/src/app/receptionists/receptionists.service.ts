import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { MEDROUTER_API } from "../api/app.api";
import { SignUp } from "../auth/models/signup.model";
import { ClientDto } from "./dtos/client-dto";
import { SearchClientDto } from "./dtos/search-client-dto";

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
    const query = username ? `&usernam=${username}` : "";
    return this.http.get<ClientDto[]>(`${MEDROUTER_API}/clients?page=${page}`);
  }
}
