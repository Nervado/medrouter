import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { HourSchedule } from "src/app/doctors/model/schedule-hour";
import { Colors } from "src/app/messages/toast/enums/colors";
import { faBriefcase, faClock } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RadioOption } from "src/app/shared/components/radio/models/radio-options.model";
import { HomeService } from "../../home.service";
import { Specialty } from "src/app/owners/enums/specialtys";
import { fmrt } from "src/app/utils/fmrt";
import { addMonths, subDays, subMonths } from "date-fns";
import { NonClientAppointmentRequest } from "./dtos/appointment-nonclient-request.dto";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-appointment-form",
  templateUrl: "./appointment-form.component.html",
  styleUrls: ["./appointment-form.component.scss"],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          opacity: 1,
          "max-height": "400px",
        })
      ),
      state(
        "closed",
        style({
          opacity: 0,
          "max-height": "0px",
        })
      ),
      transition("closed => open", [animate("300ms 0s ease-in")]),
    ]),
  ],
})
export class AppointmentFormComponent implements OnInit {
  @Input() isOpen: boolean = true;

  faClock = faClock;

  @Output() openModal: EventEmitter<
    NonClientAppointmentRequest
  > = new EventEmitter();

  hours: string[] = [];

  availables: Available[];

  availablesDays: number[] = [];

  options: RadioOption[] = [];

  faBriefCase = faBriefcase;

  requestAppointmentForm: FormGroup;

  mainColor: Colors = Colors.OPOSITY1;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.isOpen = false;

    this.homeService.getSpecialtys().subscribe({
      next: (specialtys: string[]) => {
        this.options = specialtys.map((spc) => {
          return {
            label: fmrt(spc),
            value: spc,
          };
        });
      },
    });

    this.requestAppointmentForm = this.fb.group({
      fullname: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required, Validators.email]),
      phoneNumber: this.fb.control("", [Validators.required]),
      specialty: this.fb.control("", [Validators.required]),
      date: this.fb.control("", [Validators.required]),
      hour: this.fb.control("", [Validators.required]),
    });
  }

  confirm() {
    if (!this.requestAppointmentForm.invalid) {
      this.openModal.emit(this.requestAppointmentForm.value);
    } else {
      this.ns.notify({
        message: "Por favor verifique se todos os campos foram preenchidos.",
        type: Types.WARN,
        timer: 3000,
      });
    }
  }

  send(event) {
    if (event) {
      this.homeService
        .requestAppointment(this.requestAppointmentForm.value)
        .subscribe({
          next: () => {
            this.ns.notify({
              message: `Agendamento solicitado ${
                this.requestAppointmentForm.value.fullname.split(" ")[0]
              }, consulte o email informado e se necessário entre em contato por de nossos canais de atendimento.`,
              type: Types.SUCCESS,
              timer: 4000,
            });
            this.isOpen = false;
          },

          error: () =>
            this.ns.notify({
              message:
                "Falha ao solicitar agendamento, por favor verifique os dados informados ou faça login na plataforma caso já possua cadastro.",
              type: Types.ERROR,
              timer: 10000,
            }),
        });
    }
  }

  selecteDate(event) {
    this.getAvailableDate(
      this.requestAppointmentForm.value.specialty,
      false,
      true
    );
  }

  select(event: any) {
    this.requestAppointmentForm.patchValue({
      date: new Date(),
    });
    this.getAvailableDate(event.target.value, false); //ok
  }

  navigation(event: DateNavigation) {
    this.getAvailableDate(event, true); //ok
  }

  getAvailableDate(event: any, nav?: boolean, selectedDate?: boolean) {
    const specialty = !nav
      ? event
      : this.requestAppointmentForm.value.specialty;

    const dateFromNavigation = (event: any) =>
      nav && event.current !== null
        ? new Date(event?.current.year, event?.current.month, 1)
        : undefined;

    const date =
      nav && event.current !== null ? dateFromNavigation(event) : new Date();

    this.homeService
      .getAvailableSchedules({
        year: date.getFullYear(),
        month: date.getMonth(),
        specialty,
      })
      .subscribe({
        next: (availables: Available[]) => {
          this.availables = availables;

          this.availablesDays = this.availables.map((day) => day.day);

          if (selectedDate) {
            this.hours = this.availables.find(
              (d) =>
                d.day ===
                new Date(
                  this.requestAppointmentForm.value.date || date
                ).getDate()
            ).hours;
          }
        },
      });
  }
}

export class Available {
  day: number;
  hours: string[];
}

export class DateNavigation {
  current: { year: number; month: number };
  next: { year: number; month: number };
}
