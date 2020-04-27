import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";

@Component({
  selector: "app-laboratory-page",
  templateUrl: "./laboratory-page.component.html",
  styleUrls: ["./laboratory-page.component.scss"],
})
export class LaboratoryPageComponent implements OnInit {
  mainColor: Colors = Colors.LAB;

  role: Role = Role.LAB;

  constructor() {}

  ngOnInit(): void {}
}
