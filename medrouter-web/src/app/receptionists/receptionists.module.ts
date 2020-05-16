import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceptionistsPageComponent } from "./views/receptionists-page/receptionists-page.component";
import { ReceptionistsRoutingModule } from "./receptionists-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ReceptionistsAddClientComponent } from "./components/receptionists-add-client/receptionists-add-client.component";
import { ReceptionistsVerifyClientComponent } from "./components/receptionists-verify-client/receptionists-verify-client.component";
import { ReceptionistsAppointmentsDashboardComponent } from "./components/receptionists-appointments-dashboard/receptionists-appointments-dashboard.component";
import { ReceptionistsCreateAppointmentComponent } from "./components/receptionists-create-appointment/receptionists-create-appointment.component";
import { ReceptionistsCreateAppointmentModalComponent } from './components/receptionists-create-appointment-modal/receptionists-create-appointment-modal.component';
import { ReceptionistsRescheduleModalComponent } from './components/receptionists-reschedule-modal/receptionists-reschedule-modal.component';

@NgModule({
  declarations: [
    ReceptionistsPageComponent,
    ReceptionistsAddClientComponent,
    ReceptionistsVerifyClientComponent,
    ReceptionistsAppointmentsDashboardComponent,
    ReceptionistsCreateAppointmentComponent,
    ReceptionistsCreateAppointmentModalComponent,
    ReceptionistsRescheduleModalComponent,
  ],
  imports: [CommonModule, ReceptionistsRoutingModule, SharedModule],
})
export class ReceptionistsModule {}
