import { Component, OnInit } from "@angular/core";
import {
  faEllipsisH,
  faSearch,
  faPlus,
  faFlask,
  faEdit,
  faTimes,
  faCalendarPlus,
  faUserEdit,
  faUser,
  faCoins,
  faUsers,
  faUserMd,
  faCrown,
  faChevronLeft,
  faChevronRight,
  faConciergeBell,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ManagersService } from "../../managers.service";
import { NotificationService } from "src/app/messages/notification.service";
import { EmployeeDto } from "../../dtos/employee-dto";
import { Role } from "src/app/auth/enums/roles-types";
import { Types } from "src/app/messages/toast/enums/types";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-managers-receptionists-search-edit",
  templateUrl: "./managers-receptionists-search-edit.component.html",
  styleUrls: ["./managers-receptionists-search-edit.component.scss"],
})
export class ManagersReceptionistsSearchEditComponent implements OnInit {
  faEllipsisH = faEllipsisH;
  faSearch = faSearch;
  faUser = faUser;
  faPlus = faPlus;
  faFlask = faFlask;
  faEdit = faEdit;
  faTimes = faTimes;
  faCalendarPlus = faCalendarPlus;
  faCoins = faCoins;
  faUserEdit = faUserEdit;
  faUsers = faUsers;
  faUserMd = faUserMd;
  faCrown = faCrown;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faConciergeBell = faConciergeBell;
  faTrash = faTrash;

  searchForm: FormGroup;
  receptionists: EmployeeDto[] = [];
  employee: EmployeeDto;
  page: number = 1;

  constructor(
    private fb: FormBuilder,
    private managersService: ManagersService,
    private ns: NotificationService,
    private as: AuthService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: this.fb.control(""),
    });

    this.managersService.get(1, Role.RECEPT).subscribe({
      next: (receptionists) => (this.receptionists = receptionists),
    });
  }

  handleSearch() {
    this.managersService
      .get(1, Role.RECEPT, this.searchForm.value.search)
      .subscribe((receptionists) => (this.receptionists = receptionists));
  }

  remove(modal, employee: EmployeeDto) {
    this.employee = employee;
    modal.open();
  }

  edit(modal, employee: EmployeeDto) {
    this.employee = employee;
    modal.open();
  }

  pageUp() {
    this.page += 1;
    this.find(this.page);
  }

  pageDown() {
    if (this.page === 1) {
      this.page = 1;
    } else {
      this.page -= 1;
      this.find(this.page);
    }
  }

  find(page: number) {
    this.managersService
      .get(page, Role.RECEPT, this.searchForm.value.search)
      .subscribe({
        next: (receptionists: EmployeeDto[]) =>
          (this.receptionists = receptionists),
        error: () =>
          this.ns.notify({
            message: "Falha ao buscar usuários",
            type: Types.ERROR,
          }),
      });
  }

  dismiss(event: any) {
    if (this.checkPassword(event.password, this.as)) {
      this.managersService
        .patchStatus(Role.RECEPT, event.id, "dismiss")
        .subscribe({
          next: () => {
            this.find(1);
            this.ns.notify({
              message: "Funcionário dispensado",
              type: Types.WARN,
            });
          },
        });
    }
  }

  rehire(id: string) {
    this.managersService.patchStatus(Role.RECEPT, id, "re-hired").subscribe({
      next: () => {
        this.find(1);
        this.ns.notify({
          message: "Funcionário recontratado",
          type: Types.SUCCESS,
        });
      },
    });
  }

  diff(event: any) {
    if (this.checkPassword(event.password, this.as)) {
      this.managersService.diff(Role.RECEPT, event.id, event.diff).subscribe({
        next: () => {
          this.find(1);
          this.ns.notify({
            message: "Remuneração atualizada",
            type: Types.SUCCESS,
          });
        },
      });
    }
  }

  checkPassword(password: string, authService: AuthService) {
    const pass = authService.loginDto.password;
    if (pass !== undefined && pass !== null && password === pass) {
      return true;
    } else {
      this.ns.notify({
        message: "Realize o login e digite sua senha!",
        type: Types.ERROR,
      });
      return false;
    }
  }
}
