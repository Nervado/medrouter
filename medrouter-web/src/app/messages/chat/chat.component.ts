import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  faChevronLeft,
  faEdit,
  faPaperPlane,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ChatService } from "../chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  faSend = faPaperPlane;
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;
  faChevronLeft = faChevronLeft;

  user: UserDto = new UserDto();

  chats: UserDto[];

  state: State = State.MSG;

  msgs: String[] = [];

  messages: Message[] = [];

  @Input() message = new FormControl("");

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // some method to load users messagens
    this.chatService.receiveChat().subscribe({
      next: (message: string) =>
        this.messages.push({
          message,
          left: true,
        }),
    });
  }

  send(message: string) {
    if (message !== "") {
      this.message.setValue("");
      this.chatService.sendChat(message);
      this.messages.push({
        message,
        left: false,
      });
    }
  }
}

enum State {
  EDIT,
  MSG,
  SRC,
  STB,
  CHT,
}

class UserDto {
  username: string;
  fullname: string;
  surname: string;
  avatar: {
    url: string;
  };
  new: number = 4;
}

class Message {
  sender?: string;
  receiver?: string;
  message?: string;
  left?: boolean;
}
