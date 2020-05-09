import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DoctorPageComponent } from "./views/doctor-page/doctor-page.component";

import { ScheduleComponent } from "./components/schedule/schedule.component";
import { DoctorScheduleComponent } from "./components/doctor-schedule/doctor-schedule.component";
import { DoctorsCreateScheduleComponent } from "./components/doctors-create-schedule/doctors-create-schedule.component";

const routes: Routes = [
  {
    path: "",
    component: DoctorPageComponent,
    children: [
      {
        path: "",
        redirectTo: "create-schedule",
        pathMatch: "full",
      },
      {
        path: "create-schedule",
        component: DoctorsCreateScheduleComponent,
      },
      {
        path: "schedule",
        component: ScheduleComponent,
      },
      {
        path: "doctor-schedule",
        component: DoctorScheduleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
