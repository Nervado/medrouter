import { Socket } from 'socket.io';
import { MessageDto } from './message.dto';

export interface ClientWsDto {
  _id?: string;
  id?: string;
  avatar?: string;
  socket?: Socket;
  username?: string;
  fullname?: string;
  surname?: string;
  messages?: MessageDto[];
  online?: boolean;
}
