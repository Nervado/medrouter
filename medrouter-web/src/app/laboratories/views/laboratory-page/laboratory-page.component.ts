import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-laboratory-page",
  templateUrl: "./laboratory-page.component.html",
  styleUrls: ["./laboratory-page.component.scss"],
})
export class LaboratoryPageComponent implements OnInit {
  mainColor: Colors = Colors.LAB;

  role: Role = Role.LAB;

  link: any = ["/laboratories", null];

  user;

  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.link[1] = this.as.getRuleId(Role.LAB);
    this.user = this.as.getUser();
  }
}
