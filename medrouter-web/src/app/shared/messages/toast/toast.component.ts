import { Component, OnInit } from "@angular/core";
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
import { ToastDto } from "./dto/toast-dto";

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
      transition("hidden => visible", [animate("{{load}}ms ease-out")], {
        params: { load: 1000 },
      }),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  toast: Toast;
  toasts: Array<Toast> = [];
  faTimes = faTimes;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.toast = new Toast();
    this.notificationService.notifier
      .pipe(
        tap((toast: ToastDto) => {
          this.toast.init(toast);
          this.toast.show();
          this.toasts.push(this.toast);
        }),
        switchMap(() => timer(this.toast.timer))
      )
      .subscribe(() => this.toast.hide());
  }

  show() {
    this.toast.show();
  }

  hide() {
    this.toast.hide();
  }
}
