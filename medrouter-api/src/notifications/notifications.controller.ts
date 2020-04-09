import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './interfaces/notification.interface';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    console.log(
      `creating a new . Data: ${JSON.stringify(createNotificationDto)}`,
    );
    return this.notificationService.create(createNotificationDto);
  }
}
