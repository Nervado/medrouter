import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DoctorPageComponent } from "./views/doctor-page/doctor-page.component";
import { DoctorsRoutingModule } from "./doctors-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DoctorScheduleComponent } from './components/doctor-schedule/doctor-schedule.component';
import { DoctorsCreateScheduleComponent } from './components/doctors-create-schedule/doctors-create-schedule.component';

@NgModule({
  declarations: [DoctorPageComponent, ScheduleComponent, DoctorScheduleComponent, DoctorsCreateScheduleComponent],
  imports: [CommonModule, DoctorsRoutingModule, SharedModule],
})
export class DoctorsModule {}
