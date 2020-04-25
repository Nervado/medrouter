import { Component, OnInit, Input } from "@angular/core";

import {
  faStar,
  faMapMarkerAlt,
  faUserMd,
  faClock,
  faClipboardCheck,
  faBusinessTime,
} from "@fortawesome/free-solid-svg-icons";
import { Professional } from "./models/professional.model";
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
} from "@angular/animations";

@Component({
  selector: "app-professional-card",
  templateUrl: "./professional-card.component.html",
  styleUrls: ["./professional-card.component.scss"],
  animations: [
    trigger("right", [
      transition(
        "* => *",
        animate(
          "500ms ease-in-out",
          keyframes([
            style({ transform: "translateX(200px)" }),
            style({ transform: "translateX(100px)" }),
            style({ transform: "translateX(0)" }),
          ])
        )
      ),
    ]),
    trigger("left", [
      transition(
        "* => *",
        animate(
          "400ms ease-in-out",
          keyframes([
            style({ transform: "translateX(-200px)" }),
            style({ transform: "translateX(-100px)" }),
            style({ transform: "translateX(0)" }),
          ])
        )
      ),
    ]),
  ],
})
export class ProfessionalCardComponent implements OnInit {
  faStar = faStar;
  faMapMarkerAlt = faMapMarkerAlt;
  faCheckSquare = faClipboardCheck;
  faClock = faClock;
  faBusinessTime = faBusinessTime;
  user = faUserMd;

  @Input() right: boolean;
  @Input() left: boolean;
  @Input() selected: boolean = false;

  @Input() professional: Professional;

  constructor() {}

  ngOnInit(): void {}
}
