import { Component, OnInit } from "@angular/core";
import {
  faChevronLeft,
  faChevronRight,
  faSquare,
  faCheckSquare,
  faEdit,
  faShareSquare,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

import { subDays, addDays, isSameDay } from "date-fns";

import { Hour } from "../../enums/hours.enum";
import { Months } from "../../enums/months.enum";
import { WeekDays } from "../../enums/week-days";
import { DaySchedule } from "../../model/schedule";
import { EscheduleView } from "../../model/schedule.view";

@Component({
  selector: "app-doctors-create-schedule",
  templateUrl: "./doctors-create-schedule.component.html",
  styleUrls: ["./doctors-create-schedule.component.scss"],
})
export class DoctorsCreateScheduleComponent implements OnInit {
  hours: Array<any>;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  faEdit = faEdit;
  faShare = faShareSquare;
  faSave = faSave;
  isEditing: boolean = false;

  months = Months;
  days: EscheduleView[];
  date: Date;
  today: Date;

  schedules: DaySchedule[];
  constructor() {}

  ngOnInit(): void {
    this.date = new Date();
    this.today = this.date;
    this.schedules = [
      {
        date: new Date(),
        hours: [
          { hour: "08:00", busy: true },
          { hour: "16:00", busy: true },
        ],
      },
      {
        date: addDays(new Date(), 1),
        hours: [
          { hour: "14:00", busy: false },
          { hour: "08:00", busy: false },
          { hour: "16:00", busy: false },
        ],
      },
      {
        date: addDays(new Date(), 3),
        hours: [
          { hour: "08:00", busy: true },
          { hour: "16:00", busy: true },
          { hour: "08:00", busy: true },
          { hour: "16:00", busy: true },
        ],
      },
    ];
    this.days = this.setDays(this.date);
    console.log(this.days, this.schedules);
  }

  mark(e, g) {
    console.log(e, g);
  }

  setDays(ref: Date): Array<any> {
    const dom = subDays(ref, ref.getDay());
    return WeekDays.map((day, i) => {
      const date = addDays(dom, i);
      return {
        date: date,
        name: day,
        day: date.getDate(),
        hours: this.hours = Hour.map((el) => {
          const scheduled = { available: true, busy: false };
          this.schedules.find((s) =>
            s.hours.find((h) => {
              if (h.hour === el && isSameDay(s.date, date)) {
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
}
