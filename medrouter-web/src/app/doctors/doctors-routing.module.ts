import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DoctorPageComponent } from "./views/doctor-page/doctor-page.component";

import { ScheduleComponent } from "./components/schedule/schedule.component";

import { DoctorsCreateScheduleComponent } from "./components/doctors-create-schedule/doctors-create-schedule.component";
import { DoctorsCreatePrescriptionComponent } from "./components/doctors-create-prescription/doctors-create-prescription.component";
import { DoctorsExamsDashboardComponent } from "./components/doctors-exams-dashboard/doctors-exams-dashboard.component";
import { DoctorsHistoryClientsDashboardComponent } from "./components/doctors-history-clients-dashboard/doctors-history-clients-dashboard.component";
import { path } from "d3";
import { EditPrescriptionComponent } from "./components/edit-prescription/edit-prescription.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full",
  },
  {
    path: ":id",
    component: DoctorPageComponent,
    children: [
      {
        path: "",
        redirectTo: "schedules",
        pathMatch: "full",
      },
      {
        path: "create-prescription",
        component: DoctorsCreatePrescriptionComponent,
      },
      {
        path: "create-prescription/:id",
        component: DoctorsCreatePrescriptionComponent,
      },
      {
        path: "create-schedule",
        component: DoctorsCreateScheduleComponent,
      },
      {
        path: "schedules",
        component: ScheduleComponent,
      },
      {
        path: "exams",
        component: DoctorsExamsDashboardComponent,
      },
      {
        path: "history",
        component: DoctorsHistoryClientsDashboardComponent,
      },
      {
        path: "history/:id",
        component: EditPrescriptionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
