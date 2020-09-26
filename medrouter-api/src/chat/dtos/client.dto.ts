import { Socket } from 'socket.io';
import { Role } from 'src/auth/enums/role.enum';
import { MessageDto } from './message.dto';

export interface ClientWsDto {
  _id?: string;
  id?: string;
  avatar?: string;
  socket?: Socket;
  username?: string;
  fullname?: string;
  role?: Role[];
  surname?: string;
  messages?: MessageDto[];
  online?: boolean;
}
