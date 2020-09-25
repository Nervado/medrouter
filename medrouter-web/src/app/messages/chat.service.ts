import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { MEDROUTER_API } from "../api/app.api";
import { AuthService } from "../auth/auth.service";

import { Message } from "./chat/chat.component";
import { ClientWs } from "./chat/dtos/user-chat.dto";
import { CustomSocket } from "./custom-socket";

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

    console.log("emit false");

    this.socket.emit("desconect");
  }

  receiveChat(): Observable<Message> {
    return this.socket.fromEvent("messages");
  }

  receiveUsers(): Observable<ClientWs[]> {
    return this.socket.fromEvent("users");
  }

  connect() {
    console.log("emit true");
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
    return this.http.patch<void>(`${MEDROUTER_API}/chat/${id}/messages/`, ids);
  }
}

enum ConnectionStatus {
  ON = "on",
  OFF = "off",
}
