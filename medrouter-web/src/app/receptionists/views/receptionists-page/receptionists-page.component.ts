import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-receptionists-page",
  templateUrl: "./receptionists-page.component.html",
  styleUrls: ["./receptionists-page.component.scss"],
})
export class ReceptionistsPageComponent implements OnInit {
  mainColor: Colors = Colors.RECEPT;

  link: any = ["/receptionists", null];

  role: Role = Role.RECEPT;

  user;

  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.link[1] = this.as.getRuleId(Role.RECEPT);
    this.user = this.as.getUser();
  }
}
