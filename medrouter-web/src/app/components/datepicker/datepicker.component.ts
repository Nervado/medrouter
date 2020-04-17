import { Component, OnInit, Injectable } from "@angular/core";
import {
  NgbDateStruct,
  NgbDatepickerI18n,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { Data } from "./models/datepicker.model";

const I18N_VALUES = {
  br: {
    weekdays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    months: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
  },
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = "br";
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    // return `${date.day}-${date.month}-${date.year}`;
    return `${date.day} de ${date.month} de ${date.year}`;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = " de ";

  readonly service = new CustomDatepickerI18n(new I18n());

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day +
          this.DELIMITER +
          this.service.getMonthShortName(date.month) +
          this.DELIMITER +
          date.year
      : "";
  }
}

@Component({
  selector: "app-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.scss"],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class DatepickerComponent implements OnInit {
  model: Data;
  faCalendarAlt = faCalendarAlt;

  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    console.log("clickou");
  }
}
