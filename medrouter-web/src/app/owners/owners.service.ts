import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MEDROUTER_API } from "../api/app.api";
import { NewDoctorDto } from "./components/search-employees/dtos/newdoctor";

@Injectable({
  providedIn: "root",
})
export class OwnersService {
  constructor(private h: HttpClient) {}

  create(doctor: NewDoctorDto): Observable<any> {
    console.log(doctor);

    return this.h.post<any>(`${MEDROUTER_API}/doctors`, {
      ...doctor,
    });
  }
}
