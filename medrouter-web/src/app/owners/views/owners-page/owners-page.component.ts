import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-owners-page",
  templateUrl: "./owners-page.component.html",
  styleUrls: ["./owners-page.component.scss"],
})
export class OwnersPageComponent implements OnInit {
  mainColor: Colors = Colors.OWNER;

  role: Role = Role.OWNER;

  link = ["/owners", null];

  user;

  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.link[1] = this.as.getRuleId(Role.OWNER);
    this.user = this.as.getUser();
  }
}
