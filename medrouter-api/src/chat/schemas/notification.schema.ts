import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  receiver: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  read: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
