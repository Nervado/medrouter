import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-managers-page",
  templateUrl: "./managers-page.component.html",
  styleUrls: ["./managers-page.component.scss"],
})
export class ManagersPageComponent implements OnInit {
  mainColor: Colors = Colors.MANAGER;
  role: Role = Role.MANAGER;

  link: any = ["/managers", null];

  user;

  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.link[1] = this.as.getRuleId(Role.MANAGER);
    this.user = this.as.getUser();
  }
}
