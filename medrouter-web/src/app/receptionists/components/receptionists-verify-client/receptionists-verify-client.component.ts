import { Component, OnInit, ChangeDetectorRef, Type } from "@angular/core";
import {
  faFileMedicalAlt,
  faLock,
  faAt,
  faUser,
  faPhone,
  faAddressCard,
  faTimes,
  faChevronLeft,
  faChevronRight,
  faSquare,
  faEdit,
  faSave,
  faClock,
  faHistory,
  faFileMedical,
  faSearch,
  faMedkit,
  faUserMd,
  faUserTie,
  faCheck,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Colors } from "src/app/messages/toast/enums/colors";
import {
  faCheckCircle,
  faShareSquare,
  faCheckSquare,
  faTimesCircle,
  faEnvelope,
  faIdCard,
} from "@fortawesome/free-regular-svg-icons";
import { Months } from "src/app/doctors/enums/months.enum";
import { EscheduleView } from "src/app/doctors/model/schedule.view";
import { Appointment } from "src/app/doctors/model/appointment";
import { Hour } from "src/app/doctors/enums/hours.enum";
import { setHours } from "date-fns";
import { AppointmentStatus } from "src/app/doctors/enums/appontment-status";
import { ClientDto } from "../../dtos/client-dto";
import { ReceptionistsService } from "../../receptionists.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { DocDto } from "../../dtos/doc-dto";
import { DoctorDto } from "src/app/doctors/model/doctor-dto";

@Component({
  selector: "app-receptionists-verify-client",
  templateUrl: "./receptionists-verify-client.component.html",
  styleUrls: ["./receptionists-verify-client.component.scss"],
})
export class ReceptionistsVerifyClientComponent implements OnInit {
  hours: Array<any>;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  faTimes = faTimesCircle;
  isEditing: boolean = false;
  faHistory = faHistory;
  faFileMedical = faFileMedical;
  faSearch = faSearch;
  faMedKit = faMedkit;
  faUserMd = faUserMd;
  faUserTie = faUserTie;
  faCheckCircle = faCheckCircle;
  faCheck = faCheck;
  faAt = faAt;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faIdCard = faIdCard;
  faFileDownload = faFileDownload;

  preview: any;
  file: File;

  docForm: FormGroup;

  date: Date;

  showSearch: boolean = false;

  filter: string;

  clients: ClientDto[] = [];
  page: number = 1;

  edit: false;

  toogle() {
    this.showSearch = !this.showSearch;
  }

  search(username: string) {
    this.page = 1;
    this.updateClientList(this.page, username);
  }

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private rs: ReceptionistsService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.date = new Date();
    this.docForm = this.fb.group({
      file: [null, Validators.required],
    });
    this.updateClientList(this.page);
  }

  pageUp() {
    this.page += 1;
    this.updateClientList(this.page);
  }
  pageDown() {
    if (this.page === 1) {
      this.page = 1;
    } else {
      this.page -= 1;
      this.updateClientList(this.page);
    }
  }

  handleChange(event: any, id: string) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.docForm.patchValue({
          avatar: reader.result,
        });
        this.preview = reader.result;
      };

      this.cd.markForCheck();
      this.upload(id);
    }
  }

  upload(id: string) {
    let formData: FormData = new FormData();
    formData.append("file", this.file);

    this.rs.uploadDoc(formData).subscribe({
      next: (doc: DocDto) => {
        this.ns.notify({
          message: "Documento atualizado",
          type: Types.INFO,
          timer: 2000,
        });
        this.updateClient(id, doc);
      },
      error: () =>
        this.ns.notify({
          message:
            "Tamanho máximo: 2 MB, Tipos aceitos: pdf, .jpg, .jpeg, .png, ou .gif!",
          type: Types.OPOSITY1,
          timer: 4000,
        }),
    });
  }

  updateClient(id: string, doc: DocDto) {
    this.rs.updateClientDoc(id, doc).subscribe({
      error: () =>
        this.ns.notify({
          message: "Falha ao atualizar documento",
          type: Types.ERROR,
          timer: 2000,
        }),
      next: () => {
        this.ns.notify({
          message: "Documento atualizado",
          type: Types.SUCCESS,
        });
        this.updateClientList(this.page);
      },
    });
  }

  handleCheck(id: string, checked: boolean) {
    this.rs.updateClientStatus(id, checked).subscribe({
      next: () => {
        this.ns.notify({
          message: "Status atualizado",
          type: Types.SUCCESS,
        });
        this.updateClientList(this.page);
      },
      error: () =>
        this.ns.notify({
          message: "Falha ao atualizar status",
          type: Types.ERROR,
        }),
    });
  }

  updateClientList(page: number, username?: string) {
    this.rs
      .getClients({
        page,
        username,
      })
      .subscribe({
        next: (clients: ClientDto[]) => (this.clients = clients),
        error: () =>
          this.ns.notify({
            message: "Falha ao obter lista de clients",
            type: Types.ERROR,
          }),
      });
  }
}
