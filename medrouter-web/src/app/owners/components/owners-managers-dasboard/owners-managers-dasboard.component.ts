import { Component, OnInit } from "@angular/core";
import {
  faEllipsisH,
  faSearch,
  faUser,
  faPlus,
  faFlask,
  faEdit,
  faTimes,
  faCalendarPlus,
  faCoins,
  faUserEdit,
  faUsers,
  faUserMd,
  faChevronLeft,
  faChevronRight,
  faUserCog,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder } from "@angular/forms";
import { EmployeeDto } from "../../dtos/employee-dto";
import { OwnersService } from "../../owners.service";
import { Role } from "src/app/auth/enums/roles-types";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-owners-managers-dasboard",
  templateUrl: "./owners-managers-dasboard.component.html",
  styleUrls: ["./owners-managers-dasboard.component.scss"],
})
export class OwnersManagersDasboardComponent implements OnInit {
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
  faUserCog = faUserCog;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTrash = faTrash;

  searchForm: FormGroup;
  managers: Array<EmployeeDto> = [];
  employee: EmployeeDto;
  page: number = 1;

  constructor(
    private fb: FormBuilder,
    private ownerService: OwnersService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: this.fb.control(""),
    });

    this.find(this.page);
  }

  handleSearch() {
    this.ownerService
      .get(1, Role.MANAGER, this.searchForm.value.search)
      .subscribe((managers) => (this.managers = managers));
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
    this.ownerService
      .get(page, Role.MANAGER, this.searchForm.value.search)
      .subscribe({
        next: (managers: EmployeeDto[]) => (this.managers = managers),
        error: () =>
          this.ns.notify({
            message: "Falha ao buscar usuários",
            type: Types.ERROR,
          }),
      });
  }

  dismiss(event: any) {
    this.ownerService.patchStatus(Role.MANAGER, event.id, "dismiss").subscribe({
      next: () => {
        this.find(1);
        this.ns.notify({
          message: "Funcionário dispensado",
          type: Types.WARN,
        });
      },
    });
  }

  rehire(id: string) {
    this.ownerService.patchStatus(Role.MANAGER, id, "re-hired").subscribe({
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
    this.ownerService.diff(Role.MANAGER, event.id, event.diff).subscribe({
      next: () => {
        this.find(1);
        this.ns.notify({
          message: "Remenuração atualizada",
          type: Types.SUCCESS,
        });
      },
    });
  }
}
