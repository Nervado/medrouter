import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';

@WebSocketGateway()
export class ChatGateway {
  private logger = new Logger();

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.logger.verbose('Chat Init...');

    return 'Hello world!';
  }

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  }
}
