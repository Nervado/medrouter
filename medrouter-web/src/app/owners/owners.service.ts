import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MEDROUTER_API } from "../api/app.api";
import { NewEmployee } from "./components/search-employees/dtos/newemplyee";
import { IncludeRule } from "./components/search-employees/enums/actions-type";
import { User } from "../auth/models/user.model";

@Injectable({
  providedIn: "root",
})
export class OwnersService {
  constructor(private h: HttpClient) {}

  create(employee: NewEmployee, include: IncludeRule): Observable<any> {
    return this.h.post<any>(`${MEDROUTER_API}/${include}`, {
      ...employee,
    });
  }
}
