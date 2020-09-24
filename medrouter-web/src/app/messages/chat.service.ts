import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MEDROUTER_API } from "../api/app.api";

import { Message } from "./chat/chat.component";
import { ClientWs } from "./chat/dtos/user-chat.dto";
import { CustomSocket } from "./custom-socket";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  status: EventEmitter<boolean> = new EventEmitter();

  constructor(private socket: CustomSocket, private http: HttpClient) {}

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
    this.socket.emit("desconect");
    this.status.emit(false);
  }

  receiveChat(): Observable<Message> {
    return this.socket.fromEvent("messages");
  }

  receiveUsers(): Observable<ClientWs[]> {
    this.status.emit(true);
    return this.socket.fromEvent("users");
  }

  connect() {
    this.socket.connect();
    this.status.emit(true);
  }

  getUserContacts(id: string): Observable<ClientWs[]> {
    return this.http.get<ClientWs[]>(`${MEDROUTER_API}/chat/${id}`);
  }
}
