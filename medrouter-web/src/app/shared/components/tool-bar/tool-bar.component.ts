import { Component, OnInit, Input } from "@angular/core";

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
  faUsersCog,
  faUserMd,
  faConciergeBell,
  faUserCog,
  faFlask,
  faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";

import {} from "@fortawesome/free-solid-svg-icons";
import { Colors } from "src/app/messages/toast/enums/colors";
import { MenuLinks } from "../user-snippet-menu/enums/menu-links";
import { Role } from "src/app/auth/enums/roles-types";
import { Icon } from "@fortawesome/fontawesome-svg-core";
import { Buttons } from "./theme/buttons.theme";

@Component({
  selector: "app-tool-bar",
  templateUrl: "./tool-bar.component.html",
  styleUrls: ["./tool-bar.component.scss"],
})
export class ToolBarComponent implements OnInit {
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

  faClock = faClock;
  faCalendarDay = faCalendarDay;

  faSignOutAlt = faSignOutAlt;

  menuLinks = MenuLinks;

  @Input() bg: Colors = Colors.BASE;

  @Input() role: Role = Role.USER;

  @Input() link: any = ["/profile", 21];

  menuIcons: Array<Icon> = [];

  constructor() {}

  ngOnInit(): void {
    this.menuIcons = Buttons[this.role];
  }

  _atob(url: string): any {
    return atob(url);
  }

  _btoa(url: string): any {
    return btoa(url);
  }
}
