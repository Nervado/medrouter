import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from "@angular/core";

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
export class ToolBarComponent implements OnInit, AfterViewInit {
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

  @Input() link: any;

  menuIcons: Array<Icon> = [];

  showNavigation: boolean = true;

  height = "100%";

  minHeight;

  innerWidth: number;

  @ViewChild("toolBarMenu") elementView: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.height = "100%";

    this.showNavigation = true;

    this.innerWidth = window.innerWidth;

    if (this.innerWidth > 640) {
      this.minHeight = "80px";
    } else {
      this.minHeight = "50px";
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth > 640) {
      this.minHeight = "80px";
    } else {
      this.minHeight = "50px";
    }

    this.toogle();
  }

  toogle() {
    this.showNavigation = !this.showNavigation;

    this.height = this.showNavigation ? "100%" : this.minHeight;
  }

  ngOnInit(): void {
    this.menuIcons = Buttons[this.role];
    this.menuLinks = MenuLinks;
  }

  _atob(url: string): any {
    return atob(url);
  }

  _btoa(url: string): any {
    return btoa(url);
  }
}
