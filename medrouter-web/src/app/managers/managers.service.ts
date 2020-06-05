import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MEDROUTER_API } from "../api/app.api";
import { NewEmployee } from "./components/search-employees/dtos/newemplyee";
import { IncludeRule } from "./components/search-employees/enums/actions-type";
import { Role } from "../auth/enums/roles-types";
import { EmployeeDto } from "./dtos/employee-dto";

@Injectable({
  providedIn: "root",
})
export class ManagersService {
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

  diff(role: Role, id: string, diff: number): Observable<EmployeeDto> {
    return this.h.patch<EmployeeDto>(`${MEDROUTER_API}/${role}s/${id}/diff`, {
      diff,
    });
  }
}
