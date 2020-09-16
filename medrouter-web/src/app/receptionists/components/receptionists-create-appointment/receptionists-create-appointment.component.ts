import { Component, OnInit } from "@angular/core";
import {
  faChevronLeft,
  faChevronRight,
  faSearch,
  faUserMd,
} from "@fortawesome/free-solid-svg-icons";

import { Months } from "src/app/doctors/enums/months.enum";
import { EscheduleView } from "src/app/doctors/model/schedule.view";
import { DaySchedule } from "src/app/doctors/model/schedule";
import { addDays, subDays, isSameDay, parseISO, isBefore } from "date-fns";
import { WeekDays } from "src/app/doctors/enums/week-days";
import { Hour } from "src/app/doctors/enums/hours.enum";
import {
  faTimesCircle,
  faCalendarPlus,
} from "@fortawesome/free-regular-svg-icons";
import { NotificationService } from "src/app/messages/notification.service";
import { ReceptionistsService } from "../../receptionists.service";

import { Types } from "src/app/messages/toast/enums/types";
import { DoctorDto, HourSchedule } from "../../dtos/schedules-dtos";
import { capitalizeAndRemoveUnderscores } from "src/app/utils/capitalizeAndRemoveUnderscore";
import { Appointment } from "../../model/appointment";

import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-receptionists-create-appointment",
  templateUrl: "./receptionists-create-appointment.component.html",
  styleUrls: ["./receptionists-create-appointment.component.scss"],
})
export class ReceptionistsCreateAppointmentComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSearch = faSearch;
  faTimes = faTimesCircle;
  faUserMd = faUserMd;
  faCalendarPlus = faCalendarPlus;
  months = Months;

  hours: Array<any>;
  days: EscheduleView[];
  date: Date;
  today: Date;

  schedules: DaySchedule[] = [];
  doctors: DoctorDto[];
  sunday: string;
  saturday: string;
  doctor: DoctorDto;

  newAppointment: Appointment;

  constructor(
    private ns: NotificationService,
    private rs: ReceptionistsService,
    private as: AuthService
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
    this.doctor = doctor;
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
        },
      });
  }

  search(username: string) {
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
    return isSameDay(date, this.date);
  }

  nextWeek() {
    if (this.doctor?.id) {
      this.today = addDays(this.today, 7);
      this.getSchedule(
        this.doctor,
        this.getSunday(this.today),
        this.getSaturday(this.today)
      );
    }
  }

  prevWeek() {
    if (this.doctor?.id) {
      this.today = subDays(this.today, 7);
      this.getSchedule(
        this.doctor,
        this.getSunday(this.today),
        this.getSaturday(this.today)
      );
    }
  }

  clear() {
    this.doctor = undefined;
    this.schedules = [];
    this.days = this.setDays(this.today);
  }

  confirm(e: { password: string; appointment: Appointment }) {
    if (this.checkPassword(e.password)) {
      this.rs.createAppointment(e.appointment).subscribe({
        next: () => {
          this.ns.notify({
            message: "Consulta solicitada com sucesso",
            type: Types.SUCCESS,
          });
          this.getSchedule(
            this.doctor,
            this.getSunday(this.today),
            this.getSaturday(this.today)
          );
        },

        error: () =>
          this.ns.notify({
            message: "Falha ao solicitar consulta!",
            type: Types.ERROR,
          }),
      });
    }
  }

  showModal(
    modal: any,
    day: DaySchedule,
    hour: HourSchedule,
    doctor: DoctorDto
  ) {
    this.newAppointment = {
      id: undefined,
      date: day.date,
      hour: hour.hour,
      doctor: doctor,
    };
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

  textAdjust(specialty: string): string {
    return capitalizeAndRemoveUnderscores(specialty)
      .replace('"', "")
      .replace('"', "");
  }

  past(day: DaySchedule, hour: HourSchedule): boolean {
    const timers = hour.hour.split(":");

    const h: number = parseInt(timers[0]);
    const m: number = parseInt(timers[1]);

    const date = new Date(day.date.setHours(h, m, 0));

    return isBefore(date, this.date);
  }

  checkPassword(password: string): boolean {
    if (
      password === this.as?.loginDto?.password &&
      this.as.loginDto !== undefined
    ) {
      return true;
    } else {
      this.ns.notify({
        message: "Refaça o login para continuar essa operação",
        type: Types.WARN,
      });
      return false;
    }
  }
}
