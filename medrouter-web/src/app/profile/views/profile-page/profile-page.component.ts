import { Component, OnInit } from "@angular/core";

import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Role } from "src/app/auth/enums/roles-types";
import { Colors } from "src/app/messages/toast/enums/colors";
import { UsersService } from "../../users.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {
  mainColor: Colors = Colors.USER;

  role: Role = Role.PROFILE;

  link: any = ["/profile", null];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.link[1] = this.usersService.getUserProfile().userId;
  }
}
