import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MEDROUTER_API } from "../api/app.api";
import { NewEmployee } from "./components/search-employees/dtos/newemplyee";
import { IncludeRule } from "./components/search-employees/enums/actions-type";
import { Role } from "../auth/enums/roles-types";
import { EmployeeDto } from "./dtos/employee-dto";
import { LabDto } from "./components/lab-remove-confirmation/dtos/lab.dto";
import { LabChangesDto } from "./dtos/changeLab-dto";

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

  createLab(lab: LabDto): Observable<LabDto> {
    return this.h.post<LabDto>(`${MEDROUTER_API}/labs`, lab);
  }

  get(page: number, role: Role, username?: string): Observable<EmployeeDto[]> {
    const query = username ? `&username=${username}` : "";
    return this.h.get<any[]>(
      `${MEDROUTER_API}/${role}ionists?page=${page}${query}`
    );
  }

  getLabs(page?: number, name?: string): Observable<LabDto[]> {
    const query = name ? `&name=${name}` : "";
    return this.h.get<LabDto[]>(`${MEDROUTER_API}/labs?page=${page}${query}`);
  }

  patchStatus(role: Role, id: string, status: string): Observable<EmployeeDto> {
    return this.h.patch<EmployeeDto>(
      `${MEDROUTER_API}/${role}ionists/${id}/status`,
      {
        status,
      }
    );
  }

  diff(role: Role, id: string, diff: number): Observable<EmployeeDto> {
    return this.h.patch<EmployeeDto>(
      `${MEDROUTER_API}/${role}ionists/${id}/diff`,
      {
        diff,
      }
    );
  }

  changeLabAvailabilityOrUsers(
    id: string,
    changes: LabChangesDto
  ): Observable<any> {
    return this.h.patch<any>(`${MEDROUTER_API}/labs/${id}`, {
      ...changes,
    });
  }
}
