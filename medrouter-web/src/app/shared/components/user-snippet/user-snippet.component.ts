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

  @Input() user: User;

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

  ngOnInit(): void {
    this.user = this.authService.user;
    this.online = this.chatService.getStatus();

    this.chatService.status.subscribe({
      next: (state: boolean) => (this.online = state),
    });

    if (this.user !== undefined && this.online) {
      this.goOnline();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["user"]) {
      if (this.online) {
        this.goOnline();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.messages !== undefined) {
      this.messages.unsubscribe();
      this.clients.unsubscribe();
    }
  }

  goOnline() {
    this.chatService.connect();

    this.chatService.getUserContacts(this.user?.user.userId).subscribe({
      next: (clients: ClientWs[]) => {
        this.users = clients;

        this.users.map((user) => {
          user.messages.map((message) => {
            if (message.sender === this.user.user.userId) {
              message.left = false;
            } else {
              message.left = true;
            }
            return message;
          });

          return user;
        });

        // get users online list
        this.chatService.requestUsersList();
      },
    });

    this.clients = this.chatService.receiveUsers().subscribe({
      next: (clients: ClientWs[]) => {
        this.users = this.updateUsers(clients);
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
  }

  changeStatus() {
    if (this.online) {
      if (this.messages !== undefined) {
        this.messages.unsubscribe();
        this.clients.unsubscribe();
      }
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
    this.chatService.toogleStatus();
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
    message.sender = this.authService.getUser().user.userId;

    receiver.messages.push(message);

    this.chatService.sendChat(message);
  }

  newUser(event) {
    this.users.push(event);
  }

  updateUsers(news: ClientWs[]): ClientWs[] {
    let _clients = this.users.map((_user) => {
      const updatedUser = news.find((newUser) => newUser.id === _user.id);

      if (updatedUser) {
        _user.avatar = updatedUser.avatar;
        _user.online = updatedUser.online;
      } else {
        _user.online = false;
      }

      return _user;
    });

    const unknownClients = news.filter(
      (newUser) => !this.users.find((_user) => _user.id === newUser.id)
    );

    if (unknownClients !== undefined) {
      _clients = [..._clients, ...unknownClients];
    }

    return _clients;
  }

  allUnread(): number {
    return (
      this.users
        .map((user) => this.countUnread(user.messages))
        .reduce((pv, cv) => cv + pv, 0) || 0
    );
  }

  countUnread(messages: Message[]): number {
    if (messages.length > 0)
      return messages.filter(
        (msg) =>
          msg.read === false &&
          msg.sender !== this.authService.getUser().user.userId
      ).length;
    else return 0;
  }
}
