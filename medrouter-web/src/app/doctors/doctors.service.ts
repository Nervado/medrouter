import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MEDICINES_API } from "../api/app.api";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DoctorsService {
  constructor(private http: HttpClient) {}
  searchMedicine(medicine: string): Observable<any> {
    return this.http.post(`${MEDICINES_API}`, {
      query: {
        wildcard: {
          product: `*${medicine}*`,
        },
      },
    });
  }
}
