import { Component, OnInit } from "@angular/core";
import {
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-notifications-sumary",
  templateUrl: "./notifications-sumary.component.html",
  styleUrls: ["./notifications-sumary.component.scss"],
})
export class NotificationsSumaryComponent implements OnInit {
  faEllipsisH = faEllipsisH;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  constructor() {}

  ngOnInit(): void {}
}
