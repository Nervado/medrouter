import {
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
} from "@angular/core";
import {
  faBell,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { formatDistance, formatRelative, parseISO } from "date-fns";

import ptBR from "date-fns/locale/pt-BR";
import { ChatService } from "../chat.service";

import { NotificationService } from "../notification.service";
import { Colors } from "../toast/enums/colors";
import { NotificationDto } from "./dtos/notification.dto";
import { NotificationTopics } from "./enums/notification-topics.dto";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
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

  constructor(
    private notificationService: NotificationService,
    private chatService: ChatService
  ) {}

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
