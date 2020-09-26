import { Model } from 'mongoose';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { NotificationDto } from './dto/create-notification.dto';

import { Notification } from './schemas/notification.schema';
import { User } from 'src/users/models/user.entity';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('Notification') private notificationModel: Model<Notification>,
    private chatService: ChatService,
  ) {}

  async create(notification: NotificationDto): Promise<void> {
    const created = new this.notificationModel(notification);

    try {
      await created.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail at create notification');
    }

    await this.emitNotification(created);

    await this.emitNumberOfUnread(created.receiver);
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }

  async getNotifications(page: number, user: User): Promise<NotificationDto[]> {
    const limit = 10;
    const pageNumber: number = page ? page * limit - limit : 0;

    await this.emitNumberOfUnread(user.userId);

    const notifications = await this.notificationModel
      .find({ receiver: user.userId })
      .limit(limit)
      .skip(pageNumber)
      .sort({
        date: 'desc',
      })
      .exec();

    return notifications;
  }

  async markAsRead(_id: string, user: User): Promise<void> {
    const notification = await this.notificationModel.findOne({ _id }).exec();

    if (!notification || notification.receiver !== user.userId) {
      throw new UnauthorizedException('Not allowed update notification status');
    }

    notification.read = true;

    try {
      await notification.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Fail at mark as read notification',
      );
    }
    await this.emitNumberOfUnread(user.userId);
  }

  emitNotification(notification: NotificationDto) {
    const clientWithScokets = this.chatService.getClientSocket(
      notification.receiver,
    );

    if (!clientWithScokets || clientWithScokets.length === 0) {
      return;
    }

    for (const client of clientWithScokets) {
      client.socket.emit('notifications_user', notification);
    }
  }

  async emitNumberOfUnread(id: string) {
    console.log('emiting....');

    const clientWithScokets = this.chatService.getClientSocket(id);

    if (!clientWithScokets || clientWithScokets.length === 0) {
      return;
    }

    const unread = await this.notificationModel
      .find({ receiver: id, read: false })
      .countDocuments()
      .exec();

    for (const client of clientWithScokets) {
      client.socket.emit('notifications_unread', unread);
    }
  }
}
