import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";

@Component({
  selector: "app-doctor-page",
  templateUrl: "./doctor-page.component.html",
  styleUrls: ["./doctor-page.component.scss"],
})
export class DoctorPageComponent implements OnInit {
  toolBarColor: Colors = Colors.DOCTOR;

  mainColor: Colors = Colors.DOCTOR;

  role: Role = Role.DOCTOR;

  constructor() {}

  ngOnInit(): void {}
}
