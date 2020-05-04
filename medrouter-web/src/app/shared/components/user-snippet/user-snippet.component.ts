import { Component, OnInit, Input } from "@angular/core";

import {
  faBell,
  faCommentAlt,
  faSignOutAlt,
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/auth/auth.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { User } from "src/app/auth/models/user.model";
import { Gretting } from "./enums/gretting";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";

@Component({
  selector: "app-user-snippet",
  templateUrl: "./user-snippet.component.html",
  styleUrls: ["./user-snippet.component.scss"],
})
export class UserSnippetComponent implements OnInit {
  faBell = faBell;
  faHome = faHome;
  faCommentAlt = faCommentAlt;
  faSignOutAlt = faSignOutAlt;
  faBars = faBars;

  user: User;

  @Input() mainColor: Colors = Colors.BASE;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
    this.notificationService.notify({
      message: `Até a próxima ${this.user.user.username}`,
      type: Types.INFO,
    });

    this.user = undefined;
  }

  isLogged(): boolean {
    return this.user ? true : false;
  }

  signup() {
    this.authService.subscribe();
  }

  login() {
    this.authService.session();
  }

  gretting(): Gretting {
    const hour = new Date().getHours();

    if (hour < 12) {
      return Gretting.MORNING;
    }
    if (hour >= 12 && hour < 18) {
      return Gretting.AFTERNOON;
    }
    if (hour >= 18) {
      return Gretting.NIGHT;
    }
  }
}
