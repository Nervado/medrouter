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

import { setHours } from "date-fns";
import { Hour } from "../../enums/hours.enum";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

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

  constructor() {}

  ngOnInit(): void {
    this.date = new Date();
    this.today = this.date;

    this.appointments = [
      {
        id: 34,
        hour: Hour[0],
        date: setHours(new Date(2020, 4, 10, 0, 0), 6),
        status: AppointmentStatus.ONESCHEDULE,
        client: {
          id: 1,
          user: {
            username: "Evandro",
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
}
