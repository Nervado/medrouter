import { BadGatewayException, Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { WsJwtAuthGuard } from 'src/auth/guards/ws-jwt.auth.guard';
import { GetWsUser } from 'src/users/decorators/get-ws-user.decorator';
import { User } from 'src/users/models/user.entity';
import { ChatService } from './chat.service';
import { ClientWsDto } from './dtos/client.dto';
import { MessageDto } from './dtos/message.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('MsgWsGateway');

  @WebSocketServer() server;

  constructor(private chatService: ChatService) {}

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('desconect')
  async handleDesconection(@ConnectedSocket() client: Socket) {
    client.disconnect(true);
    this.handleDisconnect(client);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('messages')
  handleMessages(@MessageBody() message: MessageDto, @GetWsUser() user: User) {
    this.logger.verbose(message);

    if (user.userId !== message.sender) {
      console.log(user.userId, message.sender);

      //throw new BadGatewayException('Not allowed id');
    }

    const receivers: ClientWsDto[] = this.chatService.get(message.receiver);

    message.read = false;

    receivers.forEach(connect => {
      connect.socket.emit('messages', message);
      this.logger.verbose(message, connect.username);
    });

    this.chatService.AddMessage(message);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('users')
  handleUsers(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    @GetWsUser() user: User,
  ) {
    this.chatService.add({
      id: user.userId,
      avatar: user.avatar?.url,
      username: user?.username,
      surname: user?.surname,
      fullname: user?.fullname,
      socket: client,
      online: true,
    });

    this.updateUsersList(user.userId, client);
  }

  private updateUsersList(id?: string, client?: Socket) {
    this.server.emit(
      'users',
      this.chatService.getAll().map(client => {
        return {
          id: client.id,
          username: client.username,
          avatar: client.avatar,
          surname: client.surname,
          fullname: client.fullname,
          messages: [],
          online: true,
        };
      }),
    );
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    //await this.server.emit('users', this.chatService.getAll());
    this.logger.debug(`New client id:${client.id} connected`);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    // Remove client by socket id
    this.chatService.remove(client.id);

    try {
      //Notify connected clients of current users
      this.updateUsersList();
      this.logger.debug('...client disconnected');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
