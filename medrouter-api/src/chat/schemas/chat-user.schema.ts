import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';
import { MessageDto } from '../dtos/message.dto';

@Schema()
export class ChatUser extends Document {
  @Prop()
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

  @Prop()
  role: Role[];
}

export const ChatUserSchema = SchemaFactory.createForClass(ChatUser);
