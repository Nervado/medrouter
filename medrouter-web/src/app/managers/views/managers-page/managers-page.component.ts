import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";

@Component({
  selector: "app-managers-page",
  templateUrl: "./managers-page.component.html",
  styleUrls: ["./managers-page.component.scss"],
})
export class ManagersPageComponent implements OnInit {
  mainColor: Colors = Colors.ADMIN;

  role: Role = Role.ADMIN;

  constructor() {}

  ngOnInit(): void {}
}
