import { Component, OnInit, Input } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { NotificationService } from "../notification.service";
import { timer, Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

import {
  trigger,
  style,
  transition,
  animate,
  state,
  query,
  animateChild,
  group,
} from "@angular/animations";

import { Toast } from "./models/toast";
import { Status } from "./enums/status";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
  animations: [
    trigger("toast-visibility", [
      state(
        "hidden",
        style({
          right: "0px",
          opacity: 0,
          visibility: "hidden",
        })
      ),
      state(
        "visible",
        style({
          right: "100px",
          opacity: 1,
          visibility: "visible",
        })
      ),
      transition("hidden <=> visible", [
        group([query("@load", [animateChild()]), animate("400ms ease-out")]),
      ]),
    ]),
    trigger("load", [
      state("hidden", style({ opacity: 1, width: "100%", offset: 0 })),
      state("visible", style({ opacity: 1, width: "0%", offset: 1 })),
      transition("hidden <=> visible", animate("2.0s ease-out")),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  toast: Toast = new Toast(2000, "Good Night!");

  faTimes = faTimes;
  subs: any;
  time: number = 2000;
  visibility: Status = Status.HIDDEN;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.time = this.toast.timer;
    this.toast.message = "Hello Toast";
    this.notificationService.notifier
      .pipe(
        tap((message) => {
          this.toast.message = message;
          this.visibility = Status.VISIBLE;
        }),
        switchMap((message) => timer(this.time))
      )
      .subscribe((timer) => this.hide());
  }

  show() {
    this.visibility = Status.VISIBLE;
  }

  hide() {
    this.visibility = Status.HIDDEN;
  }

  stop() {
    this.visibility = Status.STOPED;
  }
}
