import { Message } from "../chat.component";

export class ClientWs {
  id: string;
  avatar?: string;
  username?: string;
  fullname?: string;
  surname?: string;
  new?: number;
  messages?: Message[] = [];
}
