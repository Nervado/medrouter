import { Component, OnInit } from "@angular/core";

import {
  faEllipsisH,
  faClock,
  faCalendarDay,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import { Appointment } from "../../models/appointment";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/messages/notification.service";
import { ClientsService } from "../../clients.service";
import { isThisMinute, format } from "date-fns";
import { Types } from "src/app/messages/toast/enums/types";
import { SearchDoctorDto } from "../../models/search";
import { AppointmentStatus } from "../../enums/appontment-status";
import { Colors } from "src/app/messages/toast/enums/colors";
import { isPast } from "src/app/utils/ispast";
import { fmrt } from "src/app/utils/fmrt";
@Component({
  selector: "app-appointments-summary",
  templateUrl: "./appointments-summary.component.html",
  styleUrls: ["./appointments-summary.component.scss"],
})
export class AppointmentsSummaryComponent implements OnInit {
  faEllipsisH = faEllipsisH;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faClock = faClock;
  faCalendarDay = faCalendarDay;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  page: number = 1;

  appointments: Appointment[] = [];

  isPast = isPast;

  fmrt = fmrt;

  constructor(
    private activateRoute: ActivatedRoute,
    private ns: NotificationService,
    private cs: ClientsService
  ) {}

  ngOnInit(): void {
    this.activateRoute.parent.params.subscribe({
      next: (params) => this.getAppointments(params["id"]),
    });
  }

  getAppointments(id: string) {
    this.cs.getAppointments(id, { page: this.page }).subscribe({
      next: (apps: Appointment[]) => (this.appointments = apps),
      error: () =>
        this.ns.notify({
          message: "Falha ao obter agendamentos",
          type: Types.WARN,
        }),
    });
  }

  update(e: boolean) {
    this.page = 1;
    this.getAppointments(this.activateRoute.parent.snapshot.params["id"]);
  }

  pageUp() {
    this.page += 1;
    this.getAppointments(this.activateRoute.parent.snapshot.params["id"]);
  }

  pageDown() {
    this.page = this.page > 1 ? this.page - 1 : 1;
    this.getAppointments(this.activateRoute.parent.snapshot.params["id"]);
  }

  cancel(app: Appointment) {
    if (
      app.status !== AppointmentStatus.CANCELED &&
      app.status !== AppointmentStatus.ATTENDED
    ) {
      this.cs
        .deleteAppointment(
          this.activateRoute.parent.snapshot.params["id"],
          app.id
        )
        .subscribe({
          next: () => {
            this.ns.notify({
              message: "Agendamento cancelado",
              type: Types.INFO,
            });
            this.getAppointments(
              this.activateRoute.parent.snapshot.params["id"]
            );
          },
          error: () =>
            this.ns.notify({
              message: "Falha ao cancelar agendamento",
              type: Types.ERROR,
            }),
        });
    }
  }

  prettyDate(date) {
    return format(new Date(date), "dd/MM/yyyy");
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
}
