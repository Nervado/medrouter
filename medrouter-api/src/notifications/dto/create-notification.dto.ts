import { NotificationTopics } from '../enums/notificaiton-topic.enum';

export class NotificationDto {
  _id?: string;
  receiver: string;
  message: string;
  topic: NotificationTopics;
  read: boolean;
  date: Date;
  unread?: number;
}
