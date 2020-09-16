import { Component, OnInit } from "@angular/core";
import {
  faChevronLeft,
  faEdit,
  faPaperPlane,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

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

  constructor() {}

  ngOnInit(): void {}

  selectChat(id: string) {}
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
