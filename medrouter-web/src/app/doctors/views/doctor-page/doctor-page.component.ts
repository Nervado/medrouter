import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";
import { DoctorsService } from "../../doctors.service";
import { AuthService } from "src/app/auth/auth.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-doctor-page",
  templateUrl: "./doctor-page.component.html",
  styleUrls: ["./doctor-page.component.scss"],
})
export class DoctorPageComponent implements OnInit {
  mainColor: Colors = Colors.DOCTOR;

  role: Role = Role.DOCTOR;

  link: any = ["/doctors", null];

  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.link[1] = this.as.getRuleId(Role.DOCTOR);
  }
}
