import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WsJwtAuthGuard } from 'src/auth/guards/ws-jwt.auth.guard';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { GetWsUser } from 'src/users/decorators/get-ws-user.decorator';
import { User } from 'src/users/models/user.entity';

@WebSocketGateway()
export class ChatGateway {
  private logger = new Logger();

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.logger.verbose('Chat Init...');

    return 'Hello world!';
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    @GetWsUser() user: User,
  ): void {
    client.emit('events', data.message);
  }
}
