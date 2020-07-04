import { Component, OnInit } from "@angular/core";
import {
  faChevronLeft,
  faCheckSquare,
  faChevronRight,
  faSquare,
  faShareSquare,
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
import { Months } from "src/app/doctors/enums/months.enum";
import { EscheduleView } from "src/app/doctors/model/schedule.view";
import { Appointment } from "src/app/doctors/model/appointment";
import { Hour } from "src/app/doctors/enums/hours.enum";
import { setHours } from "date-fns";
import { AppointmentStatus } from "src/app/doctors/enums/appontment-status";
import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import { SearchAppointmentsDto } from "../../dtos/search-appointments-dto";
import { NotificationService } from "src/app/messages/notification.service";
import { ReceptionistsService } from "../../receptionists.service";
import { AuthService } from "src/app/auth/auth.service";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-receptionists-appointments-dashboard",
  templateUrl: "./receptionists-appointments-dashboard.component.html",
  styleUrls: ["./receptionists-appointments-dashboard.component.scss"],
})
export class ReceptionistsAppointmentsDashboardComponent implements OnInit {
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

  months = Months;
  days: EscheduleView[];
  date: Date;
  today: Date;
  appointments: Array<Appointment>;
  showSearch: boolean = false;

  filter: string;

  toogle() {
    this.showSearch = !this.showSearch;
  }

  confirm(e) {
    console.log(e);
  }
  openModal(modal) {
    modal.open();
  }
  search() {
    console.log("procurando nemo");
  }
  constructor(
    private ns: NotificationService,
    private rs: ReceptionistsService,
    private as: AuthService
  ) {}

  ngOnInit(): void {
    this.date = new Date();
    this.today = this.date;

    this.findAppointments({
      date: this.date,
    });
  }

  save() {}

  nextWeek() {}

  prevWeek() {}

  findAppointments(search: SearchAppointmentsDto) {
    this.rs
      .getAppointments({
        ...search,
      })
      .subscribe({
        next: (appointments: Appointment[]) =>
          (this.appointments = appointments),
        error: () =>
          this.ns.notify({
            message: "Falha ao buscar agendamentos",
            type: Types.ERROR,
          }),
      });
  }
}
