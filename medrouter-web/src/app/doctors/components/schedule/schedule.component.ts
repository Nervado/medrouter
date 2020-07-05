import { Component, OnInit } from "@angular/core";
import {
  faChevronLeft,
  faChevronRight,
  faSquare,
  faCheckSquare,
  faEdit,
  faShareSquare,
  faSave,
  faClock,
  faTimes,
  faHistory,
  faFileMedical,
} from "@fortawesome/free-solid-svg-icons";
import { Months } from "../../enums/months.enum";
import { EscheduleView } from "../../model/schedule.view";
import { Appointment } from "../../model/appointment";
import { AppointmentStatus } from "../../enums/appontment-status";

import { setHours, isThursday, addDays, subDays } from "date-fns";
import { Hour } from "../../enums/hours.enum";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { SearchAppointmentsDto } from "../../dtos/search-appointments-dto";
import { DoctorsService } from "../../doctors.service";
import { NotificationService } from "src/app/messages/notification.service";
import { ActivatedRoute } from "@angular/router";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"],
})
export class ScheduleComponent implements OnInit {
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

  months = Months;
  days: EscheduleView[];
  date: Date;
  today: Date;

  appointments: Array<Appointment>;

  constructor(
    private ds: DoctorsService,
    private ns: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.date = new Date();
    this.today = this.date;

    this.activatedRoute.parent.params.subscribe({
      next: (params) =>
        this.findAppointments(params["id"], { date: this.date.toISOString() }),
    });
  }

  nextDay() {
    this.date = addDays(this.date, 1);
    this.findAppointments(this.activatedRoute.parent.snapshot.params["id"], {
      date: this.date.toISOString(),
    });
  }

  prevDay() {
    this.date = subDays(this.date, 1);
    this.findAppointments(this.activatedRoute.parent.snapshot.params["id"], {
      date: this.date.toISOString(),
    });
  }

  findAppointments(id: string, search: SearchAppointmentsDto) {
    this.ds.getAppointments(id, search).subscribe({
      next: (appointments: Appointment[]) => (this.appointments = appointments),
      error: () =>
        this.ns.notify({
          message: "Falha ao buscar agendamentos",
          type: Types.ERROR,
        }),
    });
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
