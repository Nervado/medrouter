import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DoctorPageComponent } from "./views/doctor-page/doctor-page.component";
import { DoctorsRoutingModule } from "./doctors-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ScheduleComponent } from "./components/schedule/schedule.component";
import { DoctorsCreateScheduleComponent } from "./components/doctors-create-schedule/doctors-create-schedule.component";
import { DoctorsCreatePrescriptionComponent } from './components/doctors-create-prescription/doctors-create-prescription.component';
import { DoctorsExamsDashboardComponent } from './components/doctors-exams-dashboard/doctors-exams-dashboard.component';
import { DoctorsHistoryClientsDashboardComponent } from './components/doctors-history-clients-dashboard/doctors-history-clients-dashboard.component';
import { EditPrescriptionComponent } from './components/edit-prescription/edit-prescription.component';

@NgModule({
  declarations: [
    DoctorPageComponent,
    ScheduleComponent,
    DoctorsCreateScheduleComponent,
    DoctorsCreatePrescriptionComponent,
    DoctorsExamsDashboardComponent,
    DoctorsHistoryClientsDashboardComponent,
    EditPrescriptionComponent,
  ],
  imports: [CommonModule, DoctorsRoutingModule, SharedModule],
})
export class DoctorsModule {}
