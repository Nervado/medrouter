import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const ChatUserSchema = SchemaFactory.createForClass(ChatUser);
