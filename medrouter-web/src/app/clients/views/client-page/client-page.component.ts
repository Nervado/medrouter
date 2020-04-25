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
  selector: "app-client-page",
  templateUrl: "./client-page.component.html",
  styleUrls: ["./client-page.component.scss"],
})
export class ClientPageComponent implements OnInit {
  faPowerOff = faPowerOff;
  faHome = faHome;
  faUser = faUser;
  faFileMedical = faFileMedical;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faBookMedical = faBookMedical;
  faCalendarCheck = faCalendarCheck;
  faPoll = faPoll;
  faPlus = faPlus;
  faBell = faBell;
  faCommentAlt = faCommentAlt;

  faEllipsisH = faEllipsisH;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faClock = faClock;
  faCalendarDay = faCalendarDay;
  constructor() {}

  ngOnInit(): void {}
}
