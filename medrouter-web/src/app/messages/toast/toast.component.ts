import { Component, OnInit } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { NotificationService } from "../notification.service";
import { timer } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

import { ToastVisibility, Load } from "./animations/animations";

import { Toast } from "./models/toast";
import { ToastDto } from "./dto/toast-dto";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
  animations: [ToastVisibility, Load],
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
      .subscribe(() => {
        this.toast.hide();
        this.toast.timer = 1000;
      });
  }
}
