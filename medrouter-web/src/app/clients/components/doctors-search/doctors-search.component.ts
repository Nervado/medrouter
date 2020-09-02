import { Component, OnInit } from "@angular/core";
import {
  faEllipsisH,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faFilter,
  faUserMd,
  faStar,
  faChevronCircleLeft,
  faChevronCircleDown,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

import { FormBuilder, FormGroup } from "@angular/forms";

import { ClientsService } from "../../clients.service";
import { Doctor } from "../../models/doctor";
import { scheduled } from "rxjs";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { parseISO, format, addDays, subDays } from "date-fns";

@Component({
  selector: "app-doctors-search",
  templateUrl: "./doctors-search.component.html",
  styleUrls: ["./doctors-search.component.scss"],
})
export class DoctorsSearchComponent implements OnInit {
  faEllipsisH = faEllipsisH;
  faSearch = faSearch;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faFilter = faFilter;
  faUserMd = faUserMd;
  faStar = faStar;
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;

  stars = [1, 2, 3, 4, 5];
  searchForm: FormGroup;

  searchResult: Array<Doctor> = [];

  filter: boolean = false;

  page: number = 1;

  constructor(
    private clientsService: ClientsService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.handleSearch();
  }

  showFilter() {
    this.filter = !this.filter;
  }

  handleSearch(page?: number, username?: string) {
    this.clientsService
      .search({
        page: page ? page : 1,
        username: username ? username : undefined,
      })
      .subscribe({
        next: (doctors) => {
          this.searchResult = doctors;
          this.searchResult.forEach((doctor) =>
            this.clientsService
              .getFreeSchedules(
                doctor.id,
                doctor.schedule?.date === undefined
                  ? new Date().toISOString()
                  : doctor.schedule?.date.toISOString()
              )
              .subscribe({
                next: (schedule) => {
                  doctor.count = 0;
                  doctor.schedule = schedule
                    ? schedule
                    : { date: doctor.schedule?.date.toISOString(), hours: [] };
                },
                error: () =>
                  this.ns.notify({
                    message: "Falha ao obter agenda",
                    type: Types.ERROR,
                  }),
              })
          );
        },
        error: () =>
          this.ns.notify({
            message: "Falha ao obter lista de profissionais",
            type: Types.ERROR,
          }),
      });
  }

  addAppointment(modal) {
    modal.open();
  }

  pageUp(username?: string) {
    this.page += 1;
    this.handleSearch(this.page, username);
  }

  pageDown(username?: string) {
    this.page = this.page > 1 ? this.page - 1 : 1;
    this.handleSearch(this.page, username);
  }

  dayUporDown(doctor: Doctor, up: boolean) {
    const date =
      doctor.schedule.date === undefined
        ? new Date()
        : parseISO(doctor.schedule.date.toString());
    if (up) {
      doctor.schedule.date = addDays(date, 1);
    } else {
      doctor.schedule.date = subDays(date, 1);
    }
    this.clientsService
      .getFreeSchedules(
        doctor.id,
        doctor.schedule?.date === undefined
          ? new Date().toISOString()
          : new Date(doctor.schedule?.date).toISOString()
      )
      .subscribe({
        next: (schedule) => {
          console.log(schedule);

          doctor.count = 0;
          doctor.schedule =
            schedule !== null
              ? schedule
              : {
                  date: new Date(doctor.schedule?.date).toISOString(),
                  hours: [],
                };
        },
        error: () =>
          this.ns.notify({
            message: "Falha ao obter agenda",
            type: Types.ERROR,
          }),
      });
  }

  fmrt(name: string) {
    const newSentece = name.replace(/_/g, " ").toLowerCase();
    const sc = newSentece.split(" ");
    const sw = sc[1] ? ` ${sc[1][0].toUpperCase()}${sc[1].slice(1)}` : "";
    return sc[0][0].toUpperCase() + sc[0].slice(1) + sw;
    //return newSentece[0].toUpperCase() + newSentece.slice(1);
  }

  prettyDate(date: string, h?: string): string {
    const _date = date ? date : new Date();

    if (h) {
      const hour = h.split(":")[0] + "h";
      return format(new Date(_date), "dd/MM") + " " + hour;
    } else {
      return format(new Date(_date), "dd/MM");
    }
  }

  upOrDown(doctor: Doctor, up: boolean) {
    if (up) {
      doctor.count =
        doctor.schedule.hours.length - 3 === doctor.count
          ? doctor.count
          : doctor.count + 1;
    } else {
      doctor.count = doctor.count === 0 ? 0 : doctor.count - 1;
    }

    console.log(doctor.count);
  }
}
