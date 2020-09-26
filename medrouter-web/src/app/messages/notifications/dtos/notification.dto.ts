import { NotificationTopics } from "../enums/notification-topics.dto";

export class NotificationDto {
  _id: string;
  receiver: string;
  message: string;
  topic: NotificationTopics;
  read: boolean;
  date: Date;
  unread?: number;
}
