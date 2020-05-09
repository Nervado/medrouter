import { Component, OnInit } from "@angular/core";
import {
  faChevronLeft,
  faChevronRight,
  faSquare,
  faCheckSquare,
  faEdit,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";

import { getDay, subDays } from "date-fns";

import { Hour } from "../../enums/hours.enum";
import { WeekDays } from "../../enums/week-days";

@Component({
  selector: "app-doctors-create-schedule",
  templateUrl: "./doctors-create-schedule.component.html",
  styleUrls: ["./doctors-create-schedule.component.scss"],
})
export class DoctorsCreateScheduleComponent implements OnInit {
  hours = new Array(24).fill("");

  isEditing = false;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  faEdit = faEdit;
  faShare = faShareSquare;

  days = WeekDays;

  today: Date;

  constructor() {}

  ngOnInit(): void {
    this.today = new Date();

    console.log(this.today.getDay());

    this.hours = this.hours.map((el, i) => {
      return { hour: Hour[i], available: false };
    });
    console.log(this.hours);

    // this.days = WeekDays.map((el, i) => {});
  }

  mark(e, g) {
    console.log(e, g);
  }
}
