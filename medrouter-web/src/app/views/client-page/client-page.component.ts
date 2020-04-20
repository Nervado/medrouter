import { Component, OnInit } from "@angular/core";
import {
  faPowerOff,
  faHome,
  faUser,
  faFileMedical,
  faFileInvoiceDollar,
  faBookMedical,
  faCalendarCheck,
  faPoll,
} from "@fortawesome/free-solid-svg-icons";

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

  constructor() {}

  ngOnInit(): void {}
}
