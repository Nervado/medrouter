import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  faMapMarked,
  faPhone,
  faClock,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { AuthService } from "src/app/auth/auth.service";

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

  snipettState: boolean = false;

  user;

  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.user = this.as.getUser();
  }

  reciverFeedback(e) {
    this.snipettState = e;
    console.log(this.snipettState);
  }
}
