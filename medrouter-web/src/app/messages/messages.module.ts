import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NotificationService } from "./notification.service";
import { ToastComponent } from "./toast/toast.component";
import { SocketIoModule } from "ngx-socket-io";
import { ChatService } from "./chat.service";
import { SOCKET_IO_CONFIG } from "../api/app.api";
import { ChatComponent } from "./chat/chat.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomSocket } from "./custom-socket";
import { NotificationsComponent } from "./notifications/notifications.component";

@NgModule({
  declarations: [ToastComponent, ChatComponent, NotificationsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SocketIoModule,
    ReactiveFormsModule,
  ],
  providers: [CustomSocket, ChatService],
  exports: [ToastComponent, ChatComponent, NotificationsComponent],
})
export class MessagesModule {
  static forRoot(): ModuleWithProviders<MessagesModule> {
    return {
      ngModule: MessagesModule,
      providers: [NotificationService], //  {provide: SomeConfig, useValue: config }
    };
  }
}
