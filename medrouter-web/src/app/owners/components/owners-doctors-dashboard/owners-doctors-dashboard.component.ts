import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef,
  Output,
} from "@angular/core";
import { ReceptionistDto } from "src/app/managers/components/managers-receptionists-dismiss-modal/dtos/receptionist-dto";
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
  faSave,
  faChevronLeft,
  faChevronRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder } from "@angular/forms";

import { Specialty } from "../../enums/specialtys";
import { getArrayFromEnum } from "src/app/utils/getArrayFromEnum";
import { MultiSelectOption } from "src/app/shared/components/mult-selector-drop-drown/models/options";
import { Colors } from "src/app/messages/toast/enums/colors";
import { EmployeeDto } from "../../dtos/employee-dto";
import { OwnersService } from "../../owners.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Role } from "src/app/auth/enums/roles-types";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-owners-doctors-dashboard",
  templateUrl: "./owners-doctors-dashboard.component.html",
  styleUrls: ["./owners-doctors-dashboard.component.scss"],
})
export class OwnersDoctorsDashboardComponent implements OnInit {
  faEllipsisH = faEllipsisH;
  faSearch = faSearch;
  faUser = faUser;
  faSave = faSave;
  faPlus = faPlus;
  faFlask = faFlask;
  faEdit = faEdit;
  faTimes = faTimes;
  faCalendarPlus = faCalendarPlus;
  faCoins = faCoins;
  faUserEdit = faUserEdit;
  faUsers = faUsers;
  faUserMd = faUserMd;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTrash = faTrash;

  medicalSp: Array<any> = getArrayFromEnum(Specialty);
  isedit: boolean = false;

  page: number = 1;

  mainColor: Colors = Colors.OWNER;

  searchForm: FormGroup;
  specialtyForm: FormGroup;

  //specialty

  doctors: EmployeeDto[] = [];
  employee: EmployeeDto;

  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  id: string;

  constructor(
    private fb: FormBuilder,
    private ownerService: OwnersService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: this.fb.control(""),
    });

    this.specialtyForm = this.fb.group({
      specialty: this.fb.control([]),
    });

    this.find(this.page);
  }

  toogle() {
    this.isedit = !this.isedit;
  }

  handleSearch() {
    this.find(1);
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
      .get(page, Role.DOCTOR, this.searchForm.value.search)
      .subscribe({
        next: (doctors: EmployeeDto[]) => (this.doctors = doctors),
        error: () =>
          this.ns.notify({
            message: "Falha ao buscar usuários",
            type: Types.ERROR,
          }),
      });
  }

  dismiss(event: any) {
    this.ownerService.patchStatus(Role.DOCTOR, event.id, "dismiss").subscribe({
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
    this.ownerService.patchStatus(Role.DOCTOR, id, "re-hired").subscribe({
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
    this.ownerService.diff(Role.DOCTOR, event.id, event.diff).subscribe({
      next: () => {
        this.find(1);
        this.ns.notify({
          message: "Remenuração atualizada",
          type: Types.SUCCESS,
        });
      },
    });
  }

  putSpecialty(doctor: EmployeeDto) {
    const specialty = this.specialtyForm.value.specialty;
    if (specialty.length > 0 && doctor.id === this.id && doctor.edit === true) {
      doctor.edit = false;
      this.clear();
      this.id = undefined;
      this.ownerService.put(doctor.id, specialty).subscribe({
        next: () => {
          this.find(1);
          this.ns.notify({
            message: "Especialidade atualizada",
            type: Types.SUCCESS,
          });
        },
        error: () => {
          this.ns.notify({
            message: "Falha ao tentar atualizar",
            type: Types.ERROR,
          });
        },
      });
    }
  }

  clear() {
    this.specialtyForm.patchValue({
      specialty: [],
    });
    console.log("limpou...", this.specialtyForm.value);
  }

  editMode(doctor: EmployeeDto) {
    this.clear();
    doctor.edit = !doctor.edit;
    if (doctor.edit === true) {
      this.id = doctor.id;
      this.doctors.forEach((doctor) => {
        if (doctor.id !== this.id) {
          doctor.edit = false;
        }
      });
      console.log("Id salvo para edicao ", this.id);
    } else {
      this.id = undefined;
      console.log(this.id);
    }
  }
}
