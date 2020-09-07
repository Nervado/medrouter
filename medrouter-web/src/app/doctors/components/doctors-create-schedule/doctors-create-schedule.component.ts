import { Component, OnInit, Type } from "@angular/core";
import {
  faChevronLeft,
  faChevronRight,
  faSquare,
  faCheckSquare,
  faEdit,
  faShareSquare,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

import { subDays, addDays, isSameDay, parseISO } from "date-fns";

import { Hour } from "../../enums/hours.enum";
import { Months } from "../../enums/months.enum";
import { WeekDays } from "../../enums/week-days";
import { DaySchedule } from "../../model/schedule";
import { EscheduleView } from "../../model/schedule.view";
import { DoctorsService } from "../../doctors.service";
import { NotificationService } from "src/app/messages/notification.service";
import { ScheduleDto } from "../../dtos/schedule-dto";
import { Types } from "src/app/messages/toast/enums/types";
import { ActivatedRoute } from "@angular/router";

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
  isUpdated = false;

  months = Months;
  days: EscheduleView[];
  date: Date;
  today: Date;
  sunday: string;
  saturday: string;

  schedules: DaySchedule[];
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
        this.getSchedule(
          params["id"],
          this.getSunday(this.today),
          this.getSaturday(this.today)
        ),
    });
  }

  getSchedule(id: string, date: Date | string, endDate?: Date | string) {
    this.ds
      .getSchedules(id, {
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
        },
      });
  }

  setDays(ref: Date): Array<any> {
    const dom = subDays(ref, ref.getDay());
    return WeekDays.map((day, i) => {
      const date = addDays(dom, i);
      return {
        id: this.schedules.find((s) =>
          isSameDay(parseISO(s.date.toString()), date)
        )?.id,
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
    return isSameDay(date, this.date);
  }

  nextWeek() {
    this.today = addDays(this.today, 7);
    this.updateSchedule();
  }

  prevWeek() {
    this.today = subDays(this.today, 7);
    this.updateSchedule();
  }

  updateSchedule() {
    this.getSchedule(
      this.activatedRoute.parent.snapshot.params["id"],
      this.getSunday(this.today),
      this.getSaturday(this.today)
    );
  }

  setBusy(date: Date, hour: string, available: boolean): boolean {
    return !available;
  }

  save() {
    this.schedules = this.days.map((el: EscheduleView) => {
      return {
        id: el.id,
        date: el.date,
        hours: el.hours.filter((el) => !el.available).map((el) => el),
      };
    });
  }

  createOrSave() {
    this.save();

    if (this.schedules.find((sc) => sc.id !== undefined)) {
      this.ds
        .patchSchedules(
          this.activatedRoute.parent.snapshot.params["id"],
          this.setSchedules()
        )
        .subscribe({
          next: () => {
            this.ns.notify({
              message: "Agenda Atualizada",
              type: Types.SUCCESS,
            });
          },
          error: () =>
            this.ns.notify({
              message: "Falha ao atualizar agenda",
              type: Types.ERROR,
            }),
          complete: () => {
            this.isEditing = false;
          },
        });
    } else {
      this.create();
    }
  }

  create() {
    const schedules = this.schedules.map((schedule) => {
      return {
        date: schedule.date,
        availablehours: [...schedule.hours.map((h) => h.hour)],
      };
    });

    this.ds
      .createSchedule(this.activatedRoute.parent.snapshot.params["id"], [
        ...schedules,
      ])
      .subscribe({
        next: () => {
          this.isEditing = false;
          this.updateSchedule();
        },
        error: () =>
          this.ns.notify({
            message: "Falha ao criar agenda",
            type: Types.ERROR,
          }),
        complete: () =>
          this.ns.notify({
            message: "Agenda criada com sucesso",
            type: Types.SUCCESS,
          }),
      });
  }

  setSchedules(): any {
    return this.schedules.map((schedule) => {
      return {
        id: schedule.id,
        date: schedule.date,
        availablehours: [...schedule.hours.map((h) => h.hour)],
      };
    });
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
