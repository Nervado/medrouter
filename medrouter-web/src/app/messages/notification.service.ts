import { Injectable, EventEmitter } from "@angular/core";
import { ToastDto } from "./toast/dto/toast-dto";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  notifier: EventEmitter<ToastDto> = new EventEmitter();

  notify(toast: ToastDto) {
    this.notifier.emit(toast);
  }
}
