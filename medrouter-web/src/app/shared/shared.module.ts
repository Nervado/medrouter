import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./input/input.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToastComponent } from "./messages/toast/toast.component";
import { NotificationService } from "./messages/notification.service";

@NgModule({
  declarations: [InputComponent, ToastComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [InputComponent, CommonModule, ToastComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NotificationService],
    };
  }
}
