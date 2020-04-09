import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './interfaces/notification.interface';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('Notification') private notificationModel: Model<Notification>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const createdCat = new this.notificationModel(createNotificationDto);
    return createdCat.save();
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }
}
