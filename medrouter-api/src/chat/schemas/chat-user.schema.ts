import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MessageDto } from '../dtos/message.dto';

@Schema()
export class ChatUser extends Document {
  @Prop({ required: true })
  id: string;

  @Prop()
  username: string;

  @Prop()
  surname: string;

  @Prop()
  fullname: string;

  @Prop()
  avatar: string;

  @Prop()
  messages: MessageDto[];
}

export const ChatUserSchema = SchemaFactory.createForClass(ChatUser);
