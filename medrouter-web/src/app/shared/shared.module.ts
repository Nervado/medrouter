import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./components/input/input.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { DatepickerComponent } from "./components/datepicker/datepicker.component";

import { AppointmentConfirmModalComponent } from "./components/appointment-confirm-modal/appointment-confirm-modal.component";

@NgModule({
  declarations: [
    InputComponent,
    DatepickerComponent,
    AppointmentConfirmModalComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [
    InputComponent,
    CommonModule,
    DatepickerComponent,
    AppointmentConfirmModalComponent,
  ],
})
export class SharedModule {}
