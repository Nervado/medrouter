import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

import {
  faBell,
  faCommentAlt,
  faSignOutAlt,
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/auth/auth.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { User } from "src/app/auth/models/user.model";
import { Gretting } from "./enums/gretting";
import { Colors } from "src/app/messages/toast/enums/colors";

import { UsersService } from "src/app/profile/users.service";
import { ChatService } from "src/app/messages/chat.service";
import { ClientWs } from "src/app/messages/chat/dtos/user-chat.dto";
import { Message } from "src/app/messages/chat/chat.component";
import { Observable } from "rxjs";

@Component({
  selector: "app-user-snippet",
  templateUrl: "./user-snippet.component.html",
  styleUrls: ["./user-snippet.component.scss"],
})
export class UserSnippetComponent implements OnInit, OnDestroy, OnChanges {
  faBell = faBell;
  faHome = faHome;
  faCommentAlt = faCommentAlt;
  faSignOutAlt = faSignOutAlt;
  faBars = faBars;

  showChat = false;

  user: User;

  users: ClientWs[] = [];

  online: boolean = false;

  @Input() mainColor: Colors = Colors.BASE;

  clients;
  messages;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private usersService: UsersService,
    private chatService: ChatService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.user = this.authService.user;
    if (changes["mainColor"] && this.isLogged()) {
      this.goOnline();
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.messages !== undefined) {
      this.messages.unsubscribe();
      this.clients.unsubscribe();
    }
  }

  goOnline() {
    this.chatService.connect();

    this.chatService.status.subscribe({
      next: (state: boolean) => (this.online = state),
    });

    this.chatService.getUserContacts(this.user?.user.userId).subscribe({
      next: (clients: ClientWs[]) => console.log(clients),
    });

    this.clients = this.chatService.receiveUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });

    this.messages = this.chatService.receiveChat().subscribe({
      next: (message: Message) => {
        message.left = true;
        const userWithNewMessage = this.users.find(
          (user) => user.id === message.sender
        );
        userWithNewMessage.messages.push(message);

        if (!this.showChat) {
          this.notificationService.notify({
            message: `${userWithNewMessage.username}: ${message.message}`,
            type: Types.PROFILE,
          });
        }
      },
    });

    // get users online list
    this.chatService.requestUsersList();
  }

  changeStatus() {
    if (this.online) {
      this.messages.unsubscribe();
      this.clients.unsubscribe();
      this.chatService.desconnect();
      this.notificationService.notify({
        message: "Offline",
        type: Types.ERROR,
      });
      this.showChat = false;
    } else {
      this.goOnline();
      this.notificationService.notify({
        message: "Online",
        type: Types.SUCCESS,
      });
    }
  }

  logout() {
    this.chatService.desconnect();

    this.authService.logout();
    this.notificationService.notify({
      message: `Até a próxima ${this.user.user.username}`,
      type: Types.INFO,
    });

    this.usersService.clearProfile();

    this.user = undefined;
  }

  isLogged(): boolean {
    return this.user ? true : false;
  }

  signup() {
    this.authService.subscribe();
  }

  login() {
    this.authService.session();
  }

  gretting(): Gretting {
    const hour = new Date().getHours();

    if (hour < 12) {
      return Gretting.MORNING;
    }
    if (hour >= 12 && hour < 18) {
      return Gretting.AFTERNOON;
    }
    if (hour >= 18) {
      return Gretting.NIGHT;
    }
  }

  newMessage(message: Message) {
    const receiver = this.users.find((user) => user.id === message.receiver);
    message.left = false;
    receiver.messages.push(message);
    this.chatService.sendChat(message);
  }
}
