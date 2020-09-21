import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { CustomSocket } from "./custom-socket";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(private socket: CustomSocket, private authService: AuthService) {}

  sendChat(message) {
    this.socket.emit("events", { message });
  }

  receiveChat() {
    return this.socket.fromEvent("events");
  }

  getUsers() {
    return this.socket.fromEvent("users");
  }
}
