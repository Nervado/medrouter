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
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Months } from "src/app/doctors/enums/months.enum";
import { EscheduleView } from "src/app/doctors/model/schedule.view";

import { addDays, subDays } from "date-fns";
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
import { Available } from "../../enums/hours.enum";
import { UpdateAppointmentDto } from "../../dtos/update-appointment";

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
  faHistory = faHistory;
  faFileMedical = faFileMedical;
  faSearch = faSearch;
  faMedKit = faMedkit;
  faUserMd = faUserMd;
  faUserTie = faUserTie;
  faCheckCircle = faCheckCircle;
  faCheck = faCheck;
  faTrash = faTrash;

  months = Months;
  date: Date;
  today: Date;
  appointments: Appointment[];
  showSearch: boolean = false;
  doctor: DoctorDto = undefined;
  results: DoctorDto[] = [];
  AppointmentStatus = AppointmentStatus;
  appointment: Appointment = undefined;

  filter: string;

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

  toogle() {
    this.showSearch = !this.showSearch;
  }

  confirm(update: UpdateAppointmentDto) {
    console.log(update);

    if (this.checkPassword(update.password)) {
      this.modifyAppoiment(
        this.appointment.id,
        AppointmentStatus.RESCHEDULED,
        new Date(update.date),
        update.hour
      );
    }
  }

  checkPassword(password: string): boolean {
    if (!(this.as.loginDto.password === password) && password !== undefined) {
      this.ns.notify({
        message: "Refaça o login para realizar a operação!",
        type: Types.WARN,
      });
      return false;
    } else {
      return true;
    }
  }

  openModal(modal, appointment: Appointment) {
    this.appointment = appointment;
    modal.open();
  }

  save(doctor: DoctorDto) {
    this.doctor = doctor;
    this.setSearch();
  }

  clear() {
    this.doctor = undefined;
    this.setSearch();
  }

  search(username: string) {
    this.doctor = undefined;
    this.findAppointments({ date: this.date, username });
  }

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
        next: (appointments: Appointment[]) => {
          this.appointments = appointments;
          this.setResults(this.appointments);
        },
        error: () =>
          this.ns.notify({
            message: "Falha ao buscar agendamentos",
            type: Types.ERROR,
          }),
      });
  }

  formatText(text: string): string {
    return capitalizeAndRemoveUnderscores(text)
      .replace('"', "")
      .replace('"', "");
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
        return Colors.INFO;
      case AppointmentStatus.ONESCHEDULE:
        return Colors.RECEPT;
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

  // controls
  modifyAppoiment(
    id: string,
    status: AppointmentStatus,
    date?: Date,
    hour?: Available
  ) {
    console.log(id, status, date, hour);

    this.rs
      .patchAppoiments(id, { status, date: date?.toISOString(), hour })
      .subscribe({
        next: () => {
          this.ns.notify({
            message: "Agendamento atualizado",
            type: Types.INFO,
          });
          this.setSearch();
        },
        error: () =>
          this.ns.notify({
            message: "Falha ao atualizar agendamento",
            type: Types.ERROR,
          }),
      });
  }
  deleteSchedule(id) {
    this.rs.deleteAppointment(id).subscribe({
      next: () => {
        this.setSearch();
        this.ns.notify({
          message: "Agendamento deletado",
          type: Types.INFO,
        });
      },
      error: () =>
        this.ns.notify({
          message: "Falha ao deletar agendamento",
          type: Types.ERROR,
        }),
    });
  }
}
