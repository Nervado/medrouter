import { Component, OnInit } from "@angular/core";

import {
  faPlus,
  faPowerOff,
  faHome,
  faUser,
  faFileMedical,
  faFileInvoiceDollar,
  faBookMedical,
  faCalendarCheck,
  faPoll,
  faBell,
  faCommentAlt,
  faEllipsisH,
  faClock,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
@Component({
  selector: "app-appointments-summary",
  templateUrl: "./appointments-summary.component.html",
  styleUrls: ["./appointments-summary.component.scss"],
})
export class AppointmentsSummaryComponent implements OnInit {
  faEllipsisH = faEllipsisH;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faClock = faClock;
  faCalendarDay = faCalendarDay;
  constructor() {}

  ngOnInit(): void {}
}
