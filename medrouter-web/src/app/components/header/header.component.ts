import { Component, OnInit } from "@angular/core";
import {
  faMapMarked,
  faPhone,
  faClock,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  faWhatsapp = faWhatsapp;
  faMapMarked = faMapMarked;
  faPhone = faPhone;
  faClock = faClock;
  faCalendar = faCalendarAlt;

  constructor() {}

  ngOnInit(): void {}
}
