import { Component, OnInit } from "@angular/core";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-notifications-sumary",
  templateUrl: "./notifications-sumary.component.html",
  styleUrls: ["./notifications-sumary.component.scss"],
})
export class NotificationsSumaryComponent implements OnInit {
  faEllipsisH = faEllipsisH;
  constructor() {}

  ngOnInit(): void {}
}
