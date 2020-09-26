import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NotificationTopics } from '../enums/notificaiton-topic.enum';

@Schema()
export class Notification extends Document {
  @Prop()
  receiver: string;

  @Prop()
  message: string;

  @Prop()
  topic: NotificationTopics;

  @Prop()
  read: boolean;

  @Prop()
  date: Date;

  @Prop()
  unread: number;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
