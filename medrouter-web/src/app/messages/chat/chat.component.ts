import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
import { format, parseISO } from "date-fns";

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

  sender: ClientWs;

  receiver: ClientWs;

  state: State = State.CHT;

  @Input() users: ClientWs[] = [];

  @Input() message = new FormControl("");

  @Output() newMessage: EventEmitter<Message> = new EventEmitter();

  format = format;

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["users"] && this.users.length > 0) {
      console.log(this.users);

      this.sender = this.users?.find(
        (user) => user.id === this.authService.user?.user.userId
      );
      this.users = this.users.filter((user) => user.id !== this.sender?.id);
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
    this.chatService
      .getUserChat(this.authService.getUser().user.userId, this.receiver.id, 1)
      .subscribe({
        next: (messages: Message[]) => {
          this.receiver.messages = messages.map((msg) => {
            if (msg.sender === this.receiver.id) {
              msg.left = true;
            }

            msg.read = true;

            return msg;
          });
        },
      });
  }

  return() {
    this.state = State.CHT;
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
      return messages.filter((msg) => msg.read === false).length;
    else return 0;
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
  id?: string;
  sender?: string;
  receiver?: string;
  message?: string;
  left?: boolean;
  date?: Date;
  read?: boolean = false;
}
