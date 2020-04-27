import { Component, OnInit } from "@angular/core";

import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Role } from "src/app/auth/enums/roles-types";
import { Colors } from "src/app/messages/toast/enums/colors";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {
  mainColor: Colors = Colors.USER;

  role: Role = Role.PROFILE;

  constructor() {}

  ngOnInit(): void {}
}
