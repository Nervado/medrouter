import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NotificationService } from "./notification.service";
import { ToastComponent } from "./toast/toast.component";

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, FontAwesomeModule],
  providers: [NotificationService],
  exports: [ToastComponent],
})
export class MessagesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MessagesModule,
      providers: [NotificationService],
    };
  }
}
