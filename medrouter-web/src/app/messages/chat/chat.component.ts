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

import { AuthService } from "src/app/auth/auth.service";
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

  constructor(private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["users"]) {
      this.sender = this.users.find(
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
      };

      this.message.setValue("");

      this.newMessage.emit(newmsg);
    }
  }

  selectChat(user: ClientWs) {
    this.state = State.MSG;
    this.receiver = user;
  }

  return() {
    this.state = State.CHT;
    this.receiver = undefined;
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
