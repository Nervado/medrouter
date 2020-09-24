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
import { isThursday } from 'date-fns';
import { Socket } from 'socket.io';
import { WsJwtAuthGuard } from 'src/auth/guards/ws-jwt.auth.guard';
import { GetUser } from 'src/users/decorators/get-user.decorator';
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
  async handleDesconection(
    @ConnectedSocket() client: Socket,
    @GetWsUser() user: User,
  ) {
    client.disconnect(true);
    this.handleDisconnect(client);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('messages')
  async handleMessages(
    @MessageBody() message: MessageDto,
    @ConnectedSocket() client: Socket,
    @GetWsUser() user: User,
  ) {
    this.logger.verbose(message);

    if (user.userId !== message.sender) {
      throw new BadGatewayException('Not allowed');
    }

    const receivers: ClientWsDto[] = this.chatService.get(message.receiver);

    receivers.forEach(connect => {
      connect.socket.emit('messages', message);
      this.logger.verbose(message, connect.username);
    });

    message.read = false;

    await this.chatService.AddMessage(message);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('users')
  async handleUsers(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    @GetWsUser() user: User,
  ) {
    await this.chatService.add({
      id: user.userId,
      avatar: user.avatar?.url,
      username: user?.username,
      surname: user?.surname,
      fullname: user?.fullname,
      socket: client,
    });

    await this.updateUsersList(user.userId, client);
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
