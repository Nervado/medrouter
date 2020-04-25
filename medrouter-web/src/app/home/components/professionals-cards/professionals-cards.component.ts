import { Component, OnInit } from "@angular/core";
import { timer } from "rxjs";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Professional } from "../professional-card/models/professional.model";

import { pros } from "./data/professionals";

@Component({
  selector: "app-professionals-cards",
  templateUrl: "./professionals-cards.component.html",
  styleUrls: ["./professionals-cards.component.scss"],
})
export class ProfessionalsCardsComponent implements OnInit {
  faArrowLeft = faChevronLeft;
  faArrowRight = faChevronRight;

  public professionals: Array<Professional> = [];

  private disable = true;
  private animate: boolean = true;
  private timer = timer(2000, 2000);

  right: boolean = false;
  left: boolean = false;
  current: number;

  subscription: any;

  constructor() {}

  ngOnInit(): void {
    //load values from backend
    this.professionals = pros;
    if (pros.length <= 3) {
      this.disable = true;
      this.professionals = pros;
    } else {
      this.disable = false;
      this.professionals = pros;
      this.current = this.professionals[0] ? this.professionals[0].id : 0;
      this.subscription = this.timer.subscribe(() => {
        this.arrowRightHandler();
      });
    }
  }

  arrowRightHandler() {
    if (!this.disable) {
      this.right = !this.right;
      const first = this.professionals.shift();
      this.professionals.push(first);
    }
  }

  arrowLeftHandler() {
    if (!this.disable) {
      this.left = !this.left;
      const last = this.professionals.pop();
      this.professionals.unshift(last);
    }
  }

  handeAnimate() {
    if (!this.animate) {
      this.subscription = this.timer.subscribe(() => {
        this.arrowRightHandler();
      });
      this.animate = true;
    } else {
      this.subscription.unsubscribe();
      this.animate = false;
    }
  }
}
