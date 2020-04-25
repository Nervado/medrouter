import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InputComponent } from "./components/input/input.component";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { AppointmentConfirmModalComponent } from "./components/appointment-confirm-modal/appointment-confirm-modal.component";

@NgModule({
  declarations: [
    InputComponent,
    DatepickerComponent,
    AppointmentConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputComponent,
    CommonModule,
    DatepickerComponent,
    AppointmentConfirmModalComponent,
    FontAwesomeModule,
    NgbModule,
  ],
})
export class SharedModule {}
