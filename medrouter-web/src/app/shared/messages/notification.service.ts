import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  notifier: EventEmitter<string> = new EventEmitter();

  notify(message: string) {
    this.notifier.emit(message);
  }
}
