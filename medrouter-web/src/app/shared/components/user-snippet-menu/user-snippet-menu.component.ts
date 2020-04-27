import { Component, OnInit, Input } from "@angular/core";

import { faBars } from "@fortawesome/free-solid-svg-icons";

import { MenuLinks } from "./enums/menu-links";
import { Role } from "src/app/auth/enums/roles-types";

import { ShowUp } from "./animations/showup";
import { timer } from "rxjs";
import { Colors } from "src/app/messages/toast/enums/colors";

import { ActivatedRoute } from "@angular/router";
import { DefaultRoutes } from "src/app/auth/enums/default-routes";

@Component({
  selector: "app-user-snippet-menu",
  templateUrl: "./user-snippet-menu.component.html",
  styleUrls: ["./user-snippet-menu.component.scss"],
  animations: [ShowUp],
})
export class UserSnippetMenuComponent implements OnInit {
  faBars = faBars;
  hide: boolean = true;
  menuLinks: any = MenuLinks;
  isVerify: boolean = false;
  timer: any;

  @Input() mainColor: Colors = Colors.BASE;
  @Input() roles: Role[] = [];

  hoverStyle: string = "hover-base : true";

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.roles[0] !== Role.USER) {
      this.isVerify = true;
    }

    this.setHoverClass();
  }

  toogle() {
    this.hide = this.isVerify ? !this.hide : true;
    this.close();
  }

  close() {
    if (!this.hide) {
      this.timer = timer(5000).subscribe(() => (this.hide = true));
    }
  }

  setHoverClass(): void {
    const search: string = Object.keys(DefaultRoutes).filter(
      (key, i) =>
        DefaultRoutes[key] ===
        `/${
          this.activeRoute.parent.routeConfig
            ? this.activeRoute.parent.routeConfig.path
            : undefined
        }`
    )[0];
    search
      ? (this.hoverStyle = `hover-${search} : true`)
      : (this.hoverStyle = "hover-base : true");

    console.log(search);
  }
}