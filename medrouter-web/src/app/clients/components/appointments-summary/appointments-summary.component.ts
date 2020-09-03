import { Component, OnInit } from "@angular/core";

import {
  faPlus,
  faPowerOff,
  faHome,
  faUser,
  faFileMedical,
  faFileInvoiceDollar,
  faBookMedical,
  faCalendarCheck,
  faPoll,
  faBell,
  faCommentAlt,
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

  pageUp() {
    this.page += 1;
    this.getAppointments(this.activateRoute.parent.snapshot.params["id"]);
  }

  pageDown() {
    this.page = this.page > 1 ? this.page - 1 : 1;
    this.getAppointments(this.activateRoute.parent.snapshot.params["id"]);
  }

  cancel(id: string) {}

  prettyDate(date) {
    return format(new Date(date), "dd/MM/yyyy");
  }
}
