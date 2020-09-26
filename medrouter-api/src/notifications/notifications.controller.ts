import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationDto } from './dto/create-notification.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationService: NotificationsService) {}

  @Get('/:id')
  retriveContacts(
    @Query('page') page: number,
    @GetUser() user: User,
  ): Promise<NotificationDto[]> {
    return this.notificationService.getNotifications(page, user);
  }

  @Patch('/:id')
  updateStatusNotification(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.notificationService.markAsRead(id, user);
  }
}
