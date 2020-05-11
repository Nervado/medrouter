import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DoctorPageComponent } from "./views/doctor-page/doctor-page.component";

import { ScheduleComponent } from "./components/schedule/schedule.component";

import { DoctorsCreateScheduleComponent } from "./components/doctors-create-schedule/doctors-create-schedule.component";
import { DoctorsCreatePrescriptionComponent } from "./components/doctors-create-prescription/doctors-create-prescription.component";

const routes: Routes = [
  {
    path: "",
    component: DoctorPageComponent,
    children: [
      {
        path: "",
        redirectTo: "create-prescription",
        pathMatch: "full",
      },
      {
        path: "create-prescription",
        component: DoctorsCreatePrescriptionComponent,
      },
      {
        path: "create-schedule",
        component: DoctorsCreateScheduleComponent,
      },
      {
        path: "schedule",
        component: ScheduleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
