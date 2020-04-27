import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DoctorPageComponent } from "./views/doctor-page/doctor-page.component";
import { DoctorsRoutingModule } from "./doctors-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DoctorScheduleComponent } from './components/doctor-schedule/doctor-schedule.component';

@NgModule({
  declarations: [DoctorPageComponent, ScheduleComponent, DoctorScheduleComponent],
  imports: [CommonModule, DoctorsRoutingModule, SharedModule],
})
export class DoctorsModule {}
