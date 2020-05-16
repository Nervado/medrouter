import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Doctor } from "./models/doctor";
import { MEDROUTER_API } from "../api/app.api";
import { AuthService } from "../auth/auth.service";
import { Data } from "./interfaces/data";

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  search(string): Observable<Array<Doctor>> {
    return this.http.get<Array<Doctor>>(`${MEDROUTER_API}/doctors?page=1`);
  }

  getDataGraph(): Observable<Array<Data>> {
    return this.http.get<Array<Data>>(`${MEDROUTER_API}/client/data-graph`);
  }
}
