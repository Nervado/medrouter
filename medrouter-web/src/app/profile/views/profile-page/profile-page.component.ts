import { Component, OnInit } from "@angular/core";
import { Role } from "src/app/auth/enums/roles-types";
import { Colors } from "src/app/messages/toast/enums/colors";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {
  mainColor: Colors = Colors.USER;

  role: Role = Role.PROFILE;

  link: any = ["/profile", null];

  user;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.link[1] = this.authService.getUser().user.userId;
    this.user = this.authService.getUser();
  }
}
