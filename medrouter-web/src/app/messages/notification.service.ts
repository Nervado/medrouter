import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { MEDROUTER_API } from "../api/app.api";
import { AuthService } from "../auth/auth.service";
import { ChatService } from "./chat.service";
import { CustomSocket } from "./custom-socket";
import { NotificationDto } from "./notifications/dtos/notification.dto";
import { ToastDto } from "./toast/dto/toast-dto";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  notifier: EventEmitter<ToastDto> = new EventEmitter();

  constructor() {}

  notify(toast: ToastDto) {
    this.notifier.emit(toast);
  }
}
