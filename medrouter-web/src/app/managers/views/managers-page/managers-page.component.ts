import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Role } from "src/app/auth/enums/roles-types";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-managers-page",
  templateUrl: "./managers-page.component.html",
  styleUrls: ["./managers-page.component.scss"],
})
export class ManagersPageComponent implements OnInit {
  mainColor: Colors = Colors.MANAGER;
  role: Role = Role.MANAGER;
  faPlus = faPlus;

  constructor() {}

  ngOnInit(): void {}
}
