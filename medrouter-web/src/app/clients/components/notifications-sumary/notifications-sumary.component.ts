import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { formatDistance, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChatService } from "src/app/messages/chat.service";
import { NotificationService } from "src/app/messages/notification.service";
import { NotificationDto } from "src/app/messages/notifications/dtos/notification.dto";
import { NotificationTopics } from "src/app/messages/notifications/enums/notification-topics.dto";
import { Colors } from "src/app/messages/toast/enums/colors";

@Component({
  selector: "app-notifications-sumary",
  templateUrl: "./notifications-sumary.component.html",
  styleUrls: ["./notifications-sumary.component.scss"],
})
export class NotificationsSumaryComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faBell = faBell;

  page: number = 1;

  baseDate: Date = new Date();

  @Input() unread: number = 0;

  today = new Date();

  @Input() notifications: NotificationDto[] = [];

  @Output() updateNotifications: EventEmitter<
    NotificationDto[]
  > = new EventEmitter();

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  markAsRead(notification: NotificationDto) {
    if (!notification.read) {
      this.chatService.markAsReadNotification(notification._id).subscribe({
        next: () => {
          this.getNotifications();
        },
      });
    }
  }

  pageUp() {
    this.page += 1;
    this.getNotifications();
  }

  pageDown() {
    this.page = this.page > 1 ? this.page - 1 : 1;
    this.getNotifications();
  }

  getNotifications() {
    this.chatService.getNotifications(this.page).subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.updateNotifications.emit(this.notifications);
        this.chatService.receiveUnreadNotifications();
      },
    });
  }

  getTopicColor(topic: NotificationTopics): Colors {
    switch (topic) {
      case NotificationTopics.APPOINTMENTS:
        return Colors.INFO;
      case NotificationTopics.CONSULTANTS:
        return Colors.DOCTOR;
      case NotificationTopics.EXAMS:
        return Colors.LAB;
      case NotificationTopics.PACIENT:
        return Colors.PROFILE;
      default:
        return Colors.BASE;
    }
  }

  formatRelative(date: Date): string {
    return formatDistance(parseISO(date.toString()), this.baseDate, {
      locale: ptBR,
    });
  }
}
