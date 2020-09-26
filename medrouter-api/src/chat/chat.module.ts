import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema, Message } from './schemas/notification.schema';
import { ChatUserSchema, ChatUser } from './schemas/chat-user.schema';
import {
  NotificationSchema,
  Notification,
} from 'src/notifications/schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: ChatUser.name, schema: ChatUserSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
