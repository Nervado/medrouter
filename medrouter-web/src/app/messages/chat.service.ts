import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { MEDROUTER_API } from "../api/app.api";
import { AuthService } from "../auth/auth.service";

import { Message } from "./chat/chat.component";
import { ClientWs } from "./chat/dtos/user-chat.dto";
import { CustomSocket } from "./custom-socket";
import { NotificationDto } from "./notifications/dtos/notification.dto";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  status: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private socket: CustomSocket,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getSocket(): CustomSocket {
    return this.socket;
  }

  getStatus(): boolean {
    const status =
      localStorage.getItem(this.authService.user?.user.userId) || undefined;

    if (!status) {
      return true;
    } else {
      if (status === ConnectionStatus.ON) {
        return true;
      } else {
        return false;
      }
    }
  }

  toogleStatus() {
    const status = localStorage.getItem(this.authService.user.user.userId);

    if (status === "on") {
      localStorage.setItem(
        this.authService.user.user.userId,
        ConnectionStatus.OFF
      );
    } else {
      localStorage.setItem(
        this.authService.user.user.userId,
        ConnectionStatus.ON
      );
    }
  }

  getActiveSubscribers() {
    return this.socket.subscribersCounter;
  }

  sendChat(message: Message) {
    this.socket.emit("messages", message);
  }

  requestUsersList() {
    this.socket.emit("users");
  }

  desconnect() {
    this.status.emit(false);

    this.socket.emit("desconect");

    this.socket.disconnect();

    delete this.socket;
  }

  receiveChat(): Observable<Message> {
    return this.socket.fromEvent("messages");
  }

  receiveUsers(): Observable<ClientWs[]> {
    return this.socket.fromEvent("users");
  }

  connect() {
    this.socket = new CustomSocket(this.authService);
    this.status.emit(true);
    this.socket.connect();
  }

  getUserContacts(id: string): Observable<ClientWs[]> {
    return this.http.get<ClientWs[]>(`${MEDROUTER_API}/chat/${id}`);
  }

  getUserChat(
    id: string,
    id_receiver: string,
    page: number
  ): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${MEDROUTER_API}/chat/${id}/messages/${id_receiver}?page=${page}`
    );
  }

  markAsRead(id: string, ids: string[]): Observable<void> {
    return this.http.patch<void>(`${MEDROUTER_API}/chat/${id}/messages/`, {
      ids,
    });
  }

  findAll(): Observable<ClientWs[]> {
    return this.http.get<ClientWs[]>(`${MEDROUTER_API}/chat`);
  }

  receiveNotifications(): Observable<NotificationDto> {
    return this.socket.fromEvent("notifications_user");
  }

  requestUnreadNotifications() {
    this.socket.emit("notifications_unread");
  }

  receiveUnreadNotifications(): Observable<number> {
    return this.socket.fromEvent("notifications_unread");
  }

  getNotifications(page: number = 1): Observable<NotificationDto[]> {
    const id = this.authService.getUser().user.userId;
    return this.http.get<NotificationDto[]>(
      `${MEDROUTER_API}/notifications/${id}?page=${page}`
    );
  }

  markAsReadNotification(id: string): Observable<void> {
    return this.http.patch<void>(`${MEDROUTER_API}/notifications/${id}`, {
      read: true,
    });
  }
}

enum ConnectionStatus {
  ON = "on",
  OFF = "off",
}
