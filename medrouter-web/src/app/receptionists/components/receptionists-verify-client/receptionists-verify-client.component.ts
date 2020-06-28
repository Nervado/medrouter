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

@Component({
  selector: "app-receptionists-verify-client",
  templateUrl: "./receptionists-verify-client.component.html",
  styleUrls: ["./receptionists-verify-client.component.scss"],
})
export class ReceptionistsVerifyClientComponent implements OnInit {
  hours: Array<any>;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  faEdit = faEdit;
  faShare = faShareSquare;
  faSave = faSave;
  faClock = faClock;
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

  preview: any;
  file: File;

  docForm: FormGroup;

  months = Months;
  days: EscheduleView[];
  date: Date;
  today: Date;
  appointments: Array<Appointment>;
  showSearch: boolean = false;

  filter: string;

  clients: ClientDto[] = [];
  page: number = 1;

  toogle() {
    this.showSearch = !this.showSearch;
  }

  search() {
    console.log("procurando nemo");
  }

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private rs: ReceptionistsService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.docForm = this.fb.group({
      file: [null, Validators.required],
    });

    this.rs
      .getClients({
        page: this.page,
      })
      .subscribe({
        next: (clients: ClientDto[]) => (this.clients = clients),
        error: () =>
          this.ns.notify({
            message: "Falha ao obter lista de clients",
            type: Types.ERROR,
          }),
      });

    this.appointments = [
      {
        id: 34,
        hour: Hour[0],
        date: setHours(new Date(2020, 4, 10, 0, 0), 6),
        status: AppointmentStatus.ONESCHEDULE,
        client: {
          id: 1,
          user: {
            username: "Evandro Abreu",
            surname: "Abreu",
            avatar: {
              url: "https://api.adorable.io/avatars/50/abott@adorable.png",
            },
          },
        },
      },
      {
        id: 35,
        hour: Hour[6],
        date: setHours(new Date(2020, 4, 10, 0, 0), 4),
        status: AppointmentStatus.ONESCHEDULE,
        client: {
          id: 1,
          user: {
            username: "Andressa",
            surname: "Oliveira",
            avatar: {
              url: "https://api.adorable.io/avatars/50/abott@adorable.png",
            },
          },
        },
      },
    ];

    console.log(this.appointments);
  }

  save() {}

  nextWeek() {}

  prevWeek() {}

  handleChange(event) {
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
      this.upload();
    }
  }

  upload() {
    let formData: FormData = new FormData();
    formData.append("avatar", this.file);
  }
}
