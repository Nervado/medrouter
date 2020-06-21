import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  faEllipsisH,
  faSearch,
  faPlus,
  faFlask,
  faEdit,
  faTimes,
  faCalendarPlus,
  faUserEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Doctor } from "src/app/clients/models/doctor";
import { LabDto } from "../lab-remove-confirmation/dtos/lab.dto";
import { Colors } from "src/app/messages/toast/enums/colors";
import { ManagersService } from "../../managers.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { AuthService } from "src/app/auth/auth.service";
import { userLab } from "../../dtos/userLab-dto";
import { LabChangesDto } from "../../dtos/changeLab-dto";

@Component({
  selector: "app-managers-labs-search-edit",
  templateUrl: "./managers-labs-search-edit.component.html",
  styleUrls: ["./managers-labs-search-edit.component.scss"],
})
export class ManagersLabsSearchEditComponent implements OnInit {
  faEllipsisH = faEllipsisH;
  faSearch = faSearch;
  faPlus = faPlus;
  faFlask = faFlask;
  faEdit = faEdit;
  faTimes = faTimes;
  faCalendarPlus = faCalendarPlus;
  faUserEdit = faUserEdit;
  faTrash = faTrash;

  searchForm: FormGroup;
  searchResult: Array<Doctor> = [];
  mainColor: Colors = Colors.ADMIN;
  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();
  page: number = 1;
  labs: LabDto[];
  lab: LabDto;

  constructor(
    private fb: FormBuilder,
    private ms: ManagersService,
    private ns: NotificationService,
    private as: AuthService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      name: this.fb.control(""),
    });

    this.handleSearch();
  }

  handleSearch() {
    const name = this.searchForm.value.name;
    this.ms.getLabs(this.page, name).subscribe({
      next: (labs: LabDto[]) => (this.labs = labs),
      error: () =>
        this.ns.notify({
          message: "Falha ao buscar laboratórios",
          type: Types.ERROR,
        }),
    });
  }

  openModal(modal: any, lab?: LabDto) {
    this.lab = lab;
    modal.open();
  }

  removeLab(modal: any, lab: LabDto) {
    this.lab = lab;
    modal.open();
  }

  addUserLab(addUserLabModal, lab: LabDto) {
    this.lab = lab;
    addUserLabModal.open();
  }

  editExams(editExamsModal, lab: LabDto) {
    this.lab = lab;
    editExamsModal.open();
  }

  add(event: any) {
    this.ms.createLab(event).subscribe({
      next: () => {
        this.ns.notify({
          message: "Laboratório cadastrado com sucesso!",
          type: Types.SUCCESS,
        }),
          this.handleSearch();
      },
      error: () =>
        this.ns.notify({
          message: "Falha ao cadastrar laboratório",
          type: Types.ERROR,
        }),
    });
  }

  users(event: any) {
    if (this.checkPassword(event.password, this.as)) {
      if (event.type === "exclude") {
        this.ms
          .changeLabAvailabilityOrUsers(event.id, { users: [...event.data] })
          .subscribe({
            next: () => {
              this.ns.notify({
                message: "Usuário(s) removidos com sucesso!",
                type: Types.SUCCESS,
              });
              this.handleSearch();
            },
            error: () =>
              this.ns.notify({
                message: "Falha ao remover usuário",
                type: Types.ERROR,
              }),
          });
      }

      if (event.type === "include") {
        this.ms
          .changeLabAvailabilityOrUsers(event.id, { cpf: event.cpf })
          .subscribe({
            next: () => {
              this.ns.notify({
                message: "Usuário associado com sucesso!",
                type: Types.SUCCESS,
              });
              this.handleSearch();
            },
            error: () =>
              this.ns.notify({
                message: "Falha ao associar usuário",
                type: Types.ERROR,
              }),
          });
      }
    }
  }

  exams(event: LabChangesDto) {
    if (this.checkPassword(event.password, this.as)) {
      this.ms
        .changeLabAvailabilityOrUsers(event.id, {
          exams: event.exams,
          labcategory: event.labcategory,
        })
        .subscribe({
          next: () => {
            this.ns.notify({
              message: "Categoria(s) e exames disponíveis atualizados",
              type: Types.INFO,
            });
            this.handleSearch();
          },
          error: () =>
            this.ns.notify({
              message: "Falha ao modificar informações do laboratório",
              type: Types.ERROR,
            }),
        });
    }
  }

  makeAvailable(lab: LabDto) {
    this.ms
      .changeLabAvailabilityOrUsers(lab.id, { available: true })
      .subscribe({
        next: () => {
          this.ns.notify({
            message: "O laboratório tornou-se disponível para novos exames.",
            type: Types.SUCCESS,
          });
          this.handleSearch();
        },
        error: () =>
          this.ns.notify({
            message: "Falha ao modificar status do laboratório",
            type: Types.ERROR,
          }),
      });
  }

  remove(event: any) {
    if (this.checkPassword(event.password, this.as)) {
      this.ms
        .changeLabAvailabilityOrUsers(event.id, { available: false })
        .subscribe({
          next: () => {
            this.ns.notify({
              message:
                "O laboratório tornou-se indisponível para novos exames.",
              type: Types.INFO,
            });
            this.handleSearch();
          },
          error: () =>
            this.ns.notify({
              message: "Falha ao modificar status do laboratório",
              type: Types.ERROR,
            }),
        });
    }
  }

  usernames(users: any[]) {
    return users.map((user) => user.username);
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
