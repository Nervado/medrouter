import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CEP_API } from "../api/app.api";
import { CepDto } from "./models/cep-dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CepService {
  constructor(private http: HttpClient) {}

  get(cep: number): Observable<CepDto> {
    return this.http.get<CepDto>(`${CEP_API}/ws/${cep}/json`);
  }
}
