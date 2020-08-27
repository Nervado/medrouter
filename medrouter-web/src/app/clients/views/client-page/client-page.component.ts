import { Component, OnInit } from "@angular/core";
import {
  faPlus,
  faPowerOff,
  faHome,
  faUser,
  faFileMedical,
  faFileInvoiceDollar,
  faBookMedical,
  faCalendarCheck,
  faPoll,
  faBell,
  faCommentAlt,
  faEllipsisH,
  faClock,
  faCalendarDay,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/auth/models/user.model";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";

@Component({
  selector: "app-client-page",
  templateUrl: "./client-page.component.html",
  styleUrls: ["./client-page.component.scss"],
})
export class ClientPageComponent implements OnInit {
  faPowerOff = faPowerOff;
  faHome = faHome;
  faUser = faUser;
  faFileMedical = faFileMedical;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faBookMedical = faBookMedical;
  faCalendarCheck = faCalendarCheck;
  faPoll = faPoll;
  faPlus = faPlus;
  faBell = faBell;
  faCommentAlt = faCommentAlt;

  faEllipsisH = faEllipsisH;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faClock = faClock;
  faCalendarDay = faCalendarDay;

  faSignOutAlt = faSignOutAlt;

  mainColor: Colors = Colors.CLIENT;
  role: Role = Role.CLIENT;
  link: any = ["/clients", null];

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  user: User;
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.link[1] = this.authService.getRuleId(Role.CLIENT);
  }

  logout() {
    this.authService.logout();
    this.notificationService.notify({
      message: `Até a próxima ${this.user.user.username}`,
      type: Types.INFO,
    });
  }
}
