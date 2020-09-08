import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MEDROUTER_API } from "../api/app.api";
import { NewEmployee } from "./components/search-employees/dtos/newemplyee";
import { IncludeRule } from "./components/search-employees/enums/actions-type";
import { Role } from "../auth/enums/roles-types";
import { EmployeeDto } from "./dtos/employee-dto";
import { Specialty } from "./enums/specialtys";
import { TotalDto } from "../messages/toast/dto/total.dto";

@Injectable({
  providedIn: "root",
})
export class OwnersService {
  constructor(private h: HttpClient) {}

  create(employee: NewEmployee, include: IncludeRule): Observable<EmployeeDto> {
    return this.h.post<EmployeeDto>(`${MEDROUTER_API}/${include}`, {
      ...employee,
    });
  }

  get(page: number, role: Role, username?: string): Observable<EmployeeDto[]> {
    const query = username ? `&username=${username}` : "";
    return this.h.get<any[]>(`${MEDROUTER_API}/${role}s?page=${page}${query}`);
  }

  patchStatus(role: Role, id: string, status: string): Observable<EmployeeDto> {
    return this.h.patch<EmployeeDto>(`${MEDROUTER_API}/${role}s/${id}/status`, {
      status,
    });
  }

  patchPrice(id: string, mh: number): Observable<EmployeeDto> {
    return this.h.patch<EmployeeDto>(
      `${MEDROUTER_API}/doctors/${id}/consultant`,
      {
        mh,
      }
    );
  }

  diff(role: Role, id: string, diff: number): Observable<EmployeeDto> {
    return this.h.patch<EmployeeDto>(`${MEDROUTER_API}/${role}s/${id}/diff`, {
      diff,
    });
  }

  put(id: string, specialty: Specialty[]): Observable<EmployeeDto> {
    return this.h.put<EmployeeDto>(`${MEDROUTER_API}/doctors/${id}`, {
      specialty,
    });
  }

  getTotals(id: string): Observable<TotalDto> {
    return this.h.get<TotalDto>(`${MEDROUTER_API}/owners/${id}/totals`);
  }
}
