import { Component, OnInit } from "@angular/core";
import {
  faChevronLeft,
  faChevronRight,
  faSquare,
  faCheckSquare,
  faEdit,
  faSave,
  faShareSquare,
  faSearch,
  faTimes,
  faUserMd,
} from "@fortawesome/free-solid-svg-icons";

import { Months } from "src/app/doctors/enums/months.enum";
import { EscheduleView } from "src/app/doctors/model/schedule.view";
import { DaySchedule } from "src/app/doctors/model/schedule";
import { addDays, subDays, isSameDay, isThursday, parseISO } from "date-fns";
import { WeekDays } from "src/app/doctors/enums/week-days";
import { Hour } from "src/app/doctors/enums/hours.enum";
import {
  faTimesCircle,
  faCalendarPlus,
} from "@fortawesome/free-regular-svg-icons";
import { NotificationService } from "src/app/messages/notification.service";
import { ReceptionistsService } from "../../receptionists.service";

import { Types } from "src/app/messages/toast/enums/types";
import { DoctorDto } from "../../dtos/schedules-dtos";
import { th } from "date-fns/locale";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-receptionists-create-appointment",
  templateUrl: "./receptionists-create-appointment.component.html",
  styleUrls: ["./receptionists-create-appointment.component.scss"],
})
export class ReceptionistsCreateAppointmentComponent implements OnInit {
  hours: Array<any>;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  faEdit = faEdit;
  faShare = faShareSquare;
  faSave = faSave;
  faSearch = faSearch;
  faTimes = faTimesCircle;

  faCalendarPlus = faCalendarPlus;

  isEditing: boolean = false;

  months = Months;
  days: EscheduleView[];
  date: Date;
  today: Date;

  faUserMd = faUserMd;

  schedules: DaySchedule[] = [];

  doctors: DoctorDto[];

  sunday: string;
  saturday: string;

  username: string;

  constructor(
    private ns: NotificationService,
    private rs: ReceptionistsService,
    private activatedRoute: ActivatedRoute
  ) {}

  showSearch: boolean = false;

  toogle() {
    this.showSearch = !this.showSearch;
  }

  ngOnInit(): void {
    this.date = new Date();
    this.today = this.date;
    this.days = this.setDays(this.today);
  }

  getSchedule(doctor: DoctorDto, date: Date | string, endDate?: Date | string) {
    this.username = doctor.user.username;
    this.rs
      .getSchedules(doctor.id, {
        date,
        endDate,
      })
      .subscribe({
        error: () =>
          this.ns.notify({
            message: "Falha ao obter agenda",
            type: Types.ERROR,
          }),
        next: (schedules: DaySchedule[]) => {
          this.schedules = [...schedules];
          this.days = this.setDays(this.today);
          console.log(this.schedules);
        },
      });
  }

  mark(e, g) {
    console.log(e, g);
  }

  search(username: string) {
    //this.username = username;

    this.rs.getDoctors(username).subscribe({
      next: (doctors: DoctorDto[]) => (this.doctors = doctors),

      error: () =>
        this.ns.notify({
          message: "Falha ao buscar médicos!",
          type: Types.ERROR,
        }),
    });
  }

  setDays(ref: Date): Array<any> {
    const dom = subDays(ref, ref.getDay());
    return WeekDays.map((day, i) => {
      const date = addDays(dom, i);
      return {
        id: this.schedules[i]?.id,
        date: date,
        name: day,
        day: date.getDate(),
        hours: this.hours = Hour.map((el) => {
          const scheduled = { available: true, busy: false };
          this.schedules.find((s) =>
            s.hours.find((h) => {
              if (
                h.hour === el &&
                isSameDay(parseISO(s.date.toString()), date)
              ) {
                scheduled["available"] = false;
                scheduled["busy"] = h.busy;
              }
            })
          );

          return {
            hour: el,
            available: scheduled.available ? true : false,
            busy: scheduled.busy ? true : false,
          };
        }),
      };
    });
  }

  checkToday(date: Date): boolean {
    return isSameDay(date, this.today);
  }

  nextWeek() {
    this.date = addDays(this.date, 7);
    this.days = this.setDays(this.date);
  }

  prevWeek() {
    this.date = subDays(this.date, 7);
    this.days = this.setDays(this.date);
  }

  setBusy(date: Date, hour: string, available: boolean): boolean {
    console.log(date, hour, available);
    return !available;
  }

  save() {
    this.schedules = this.days.map((el) => {
      return {
        date: el.date,
        hours: el.hours.filter((el) => !el.available).map((el) => el),
      };
    });

    console.log(this.schedules);
  }
  confirm(e) {
    console.log(e);
  }

  showModal(modal) {
    modal.open();
  }

  getSunday(date: Date): string {
    return subDays(date, date.getDay()).toISOString();
  }

  getSaturday(date: Date): string {
    return (this.saturday = addDays(
      subDays(date, date.getDay()),
      6
    ).toISOString());
  }
}
