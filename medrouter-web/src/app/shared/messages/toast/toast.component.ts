import { Component, OnInit } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { NotificationService } from "../notification.service";
import { timer } from "rxjs";
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
  keyframes,
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
      transition(
        "hidden => visible",
        group([
          query("@load", [animateChild()]),
          animate(
            "300ms ease-out",
            keyframes([
              style({
                opacity: 0,
                right: "0px",
                visibility: "hidden",
              }),
              style({
                opacity: 1,
                right: "130px",
                visibility: "visible",
              }),
              style({
                opacity: 1,
                right: "100px",
                visibility: "visible",
              }),
              style({
                opacity: 1,
                right: "130px",
                visibility: "visible",
              }),
              style({
                opacity: 1,
                right: "100px",
                visibility: "visible",
              }),
            ])
          ),
        ])
      ),
      ,
      transition("visible => hidden", [
        group([
          query("@load", [animateChild()]),
          animate(
            "300ms ease-out",
            keyframes([
              style({
                opacity: 1,
                right: "150px",
                visibility: "visible",
                //transform: "translateY(-10px)",
              }),
              style({
                opacity: 1,
                right: "130px",
                visibility: "visible",
                //transform: "translateY(-15px)",
              }),
              style({
                opacity: 0,
                right: "0px",
                visibility: "hidden",
                //transform: "translateY(-20px)",
              }),
            ])
          ),
        ]),
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

  faTimes = faTimes;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.toast = new Toast();
    this.notificationService.notifier
      .pipe(
        tap((toast: ToastDto) => {
          this.toast.init(toast);
          this.toast.show();
        }),
        switchMap(() => timer(this.toast.timer))
      )
      .subscribe(() => this.toast.hide());
  }
}
