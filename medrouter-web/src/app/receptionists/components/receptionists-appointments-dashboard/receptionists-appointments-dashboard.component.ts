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

import { Hour } from "src/app/doctors/enums/hours.enum";
import { setHours, add, addDays, subDays } from "date-fns";
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
import { Appointment } from "../../dtos/appointment-dto";
import { capitalizeAndRemoveUnderscores } from "src/app/utils/capitalizeAndRemoveUnderscore";
import { Colors } from "src/app/messages/toast/enums/colors";
import { DoctorDto } from "../../model/doctor-dto";

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
  appointments: Appointment[];
  showSearch: boolean = false;
  doctor: DoctorDto = undefined;
  results: DoctorDto[] = [];

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
  search(username: string) {
    this.findAppointments({ date: this.date, username });
    this.results = this.appointments.map((app) => app.doctor);

    this.setResults(this.appointments);
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

  nextDay() {
    this.date = addDays(this.date, 1);
    this.setSearch();
  }

  prevDay() {
    this.date = subDays(this.date, 1);
    this.setSearch();
  }

  setSearch() {
    const search = this.doctor
      ? { date: this.date, id: this.doctor.id }
      : { date: this.date };
    this.findAppointments(search);
  }

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

  formatText(text: string): string {
    return capitalizeAndRemoveUnderscores(text);
  }

  getStatusColor(status: AppointmentStatus): Colors {
    switch (status) {
      case AppointmentStatus.ATTENDED:
        return Colors.SUCCESS;
      case AppointmentStatus.CANCELED:
        return Colors.ERROR;
      case AppointmentStatus.REQUESTED:
        return Colors.WARN;
      case AppointmentStatus.RESCHEDULED:
        return Colors.RECEPT;
      case AppointmentStatus.ONESCHEDULE:
        return Colors.INFO;

      default:
        return Colors.BASE;
    }
  }

  setResults(results: Appointment[]) {
    const ids = results.map((app) => app.doctor.id);
    const uniqueList = [...new Set(ids)];
    this.results = uniqueList.map((id) =>
      results
        .map((appointment: Appointment) => appointment.doctor)
        .find((doctor) => doctor.id === id)
    );
  }
}
