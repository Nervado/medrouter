import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";

import {
  faChevronLeft,
  faEdit,
  faPaperPlane,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { format, isThursday, parseISO } from "date-fns";

import { AuthService } from "src/app/auth/auth.service";
import { ChatService } from "../chat.service";
import { ClientWs } from "./dtos/user-chat.dto";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnChanges {
  faSend = faPaperPlane;
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;
  faChevronLeft = faChevronLeft;

  page: number = 1;

  loading: boolean = false;

  sender: ClientWs;

  receiver: ClientWs;

  state: State = State.CHT;

  results: ClientWs[] = [];
  oldResults: ClientWs[] = [];

  @Input() users: ClientWs[] = [];

  noFilteredUsers: ClientWs[] = [];

  @Input() message = new FormControl("");

  @Output() newMessage: EventEmitter<Message> = new EventEmitter();

  @Output() newUser: EventEmitter<ClientWs> = new EventEmitter();

  format = format;

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["users"] && this.users.length > 0) {
      this.sender = this.users?.find(
        (user) => user.id === this.authService.user?.user.userId
      );
      this.users = this.users.filter((user) => user.id !== this.sender?.id);
      this.noFilteredUsers = this.users;
    }
  }

  send(message: string) {
    if (message !== "") {
      const newmsg = {
        sender: this.sender?.id,
        receiver: this.receiver?.id,
        message,
        left: false,
        date: new Date(),
        read: true,
      };

      this.message.setValue("");

      this.newMessage.emit(newmsg);
    }
  }

  selectChat(user: ClientWs) {
    this.state = State.MSG;
    this.receiver = user;
    this.getMessages();
  }

  getMessages() {
    this.loading = true;
    this.chatService
      .getUserChat(
        this.authService.getUser().user.userId,
        this.receiver.id,
        this.page
      )
      .subscribe({
        next: (messages: Message[]) => {
          const oldMessages = this.receiver.messages;

          let ids = [];

          this.receiver.messages = messages.map((msg) => {
            if (msg.sender === this.receiver.id) {
              msg.left = true;
              if (!msg.read) {
                ids.push(msg._id);
              }
            } else {
              msg.left = false;
            }

            msg.read = true;

            return msg;
          });

          this.chatService
            .markAsRead(this.authService.getUser().user.userId, ids)
            .subscribe();

          this.receiver.messages = [...this.receiver.messages, ...oldMessages];

          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }

  return() {
    this.state = State.CHT;

    const ids = this.receiver.messages
      .filter((msg) => msg.sender === this.receiver.id && !msg.read)
      .map((msg) => msg._id);

    this.chatService
      .markAsRead(this.authService.getUser().user.userId, ids)
      .subscribe();

    this.receiver.messages.forEach((msg) => (msg.read = true));
    this.receiver = undefined;
  }

  lastMessage(messages: Message[]): string {
    if (messages.length > 0) {
      const last = messages[messages?.length - 1]?.message.split(" ");

      if (last.length > 3) {
        return last[0] + " " + last[1] + " " + last[2] + " " + last[3] + " ...";
      } else {
        return messages[messages?.length - 1].message;
      }
    } else {
      return "";
    }
  }

  formatDay(date: Date): string {
    if (date !== undefined && date !== null)
      return this.format(parseISO(new Date(date).toISOString()), "HH:mm");
  }

  formatHour(date: Date): string {
    if (date !== undefined && date !== null)
      return this.format(parseISO(new Date(date).toISOString()), "ddd");
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

  captureScroll(event) {
    const scrollTop = event.srcElement.scrollTop;

    if (scrollTop === 0) {
      this.page = this.page + 1;
      this.getMessages();
    }
  }

  newChat() {
    this.state = State.SRC;
    this.chatService.findAll().subscribe({
      next: (results: ClientWs[]) => {
        this.results = results;
        this.oldResults = results;
      },
    });
  }

  searchResults(therm) {
    if (therm.target.value === "") {
      this.results = this.oldResults;
    } else {
      this.results = this.oldResults.filter(
        (r) =>
          r.username.toLowerCase().indexOf(therm.target.value.toLowerCase()) >
          -1
      );
    }
  }

  searchUsersOrMessages(therm) {
    if (therm.target.value === "") {
      this.users = this.noFilteredUsers;
    } else {
      this.users = this.noFilteredUsers.filter(
        (r) =>
          r.username.toLowerCase().indexOf(therm.target.value.toLowerCase()) >
            -1 ||
          r.messages.find(
            (msg) =>
              msg.message
                .toLowerCase()
                .indexOf(therm.target.value.toLowerCase()) > -1
          )
      );
    }
  }

  selectResult(result: ClientWs) {
    result.messages = [];

    if (!this.users.find((_user) => _user.id === result.id)) {
      this.users.push(result);
      this.newUser.emit(result);
    }
    this.state = State.CHT;
  }
}

enum State {
  EDIT,
  MSG,
  SRC,
  STB,
  CHT,
}

export class Message {
  _id?: string;
  sender?: string;
  receiver?: string;
  message?: string;
  left?: boolean;
  date?: Date;
  read?: boolean = false;
}
