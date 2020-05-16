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
}
