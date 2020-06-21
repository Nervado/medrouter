import { Component, OnInit } from "@angular/core";
import {
  faCalendarPlus,
  faEllipsisH,
  faSearch,
  faUser,
  faPlus,
  faFlask,
  faEdit,
  faTimes,
  faCoins,
  faUserEdit,
  faUsers,
  faUserMd,
  faCrown,
  faChevronLeft,
  faChevronRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Doctor } from "src/app/clients/models/doctor";
import { ReceptionistDto } from "src/app/managers/components/managers-receptionists-dismiss-modal/dtos/receptionist-dto";
import { LabDto } from "src/app/managers/components/lab-remove-confirmation/dtos/lab.dto";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { ClientsService } from "src/app/clients/clients.service";
import { OwnersService } from "../../owners.service";
import { EmployeeDto } from "../../dtos/employee-dto";
import { Role } from "src/app/auth/enums/roles-types";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-owners-dasboard-search-edit",
  templateUrl: "./owners-dasboard-search-edit.component.html",
  styleUrls: ["./owners-dasboard-search-edit.component.scss"],
})
export class OwnersDasboardSearchEditComponent implements OnInit {
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
  faTrash = faTrash;

  searchForm: FormGroup;
  owners: Array<EmployeeDto> = [];
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

    this.ownerService.get(1, Role.OWNER).subscribe({
      next: (owners) => (this.owners = owners),
    });
  }

  handleSearch() {
    this.ownerService
      .get(1, Role.OWNER, this.searchForm.value.search)
      .subscribe((owners) => (this.owners = owners));
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
      .get(page, Role.OWNER, this.searchForm.value.search)
      .subscribe({
        next: (owners: EmployeeDto[]) => (this.owners = owners),
        error: () =>
          this.ns.notify({
            message: "Falha ao buscar usuários",
            type: Types.ERROR,
          }),
      });
  }

  dismiss(event: any) {
    this.ownerService.patchStatus(Role.OWNER, event.id, "dismiss").subscribe({
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
    this.ownerService.patchStatus(Role.OWNER, id, "re-hired").subscribe({
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
    this.ownerService.diff(Role.OWNER, event.id, event.diff).subscribe({
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
