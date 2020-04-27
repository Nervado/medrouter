import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";

@Component({
  selector: "app-receptionists-page",
  templateUrl: "./receptionists-page.component.html",
  styleUrls: ["./receptionists-page.component.scss"],
})
export class ReceptionistsPageComponent implements OnInit {
  mainColor: Colors = Colors.RECEPT;

  role: Role = Role.RECEPT;

  constructor() {}

  ngOnInit(): void {}
}
