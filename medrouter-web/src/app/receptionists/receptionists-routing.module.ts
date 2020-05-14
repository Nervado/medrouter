import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReceptionistsPageComponent } from "./views/receptionists-page/receptionists-page.component";
import { ReceptionistsAddClientComponent } from "./components/receptionists-add-client/receptionists-add-client.component";
import { ReceptionistsVerifyClientComponent } from "./components/receptionists-verify-client/receptionists-verify-client.component";
import { ReceptionistsAppointmentsDashboardComponent } from "./components/receptionists-appointments-dashboard/receptionists-appointments-dashboard.component";
import { ReceptionistsCreateAppointmentComponent } from "./components/receptionists-create-appointment/receptionists-create-appointment.component";
import { ReceptionistsSchedulesDashboardComponent } from "./components/receptionists-schedules-dashboard/receptionists-schedules-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: ReceptionistsPageComponent,

    children: [
      {
        path: "",
        redirectTo: "appointments",
        pathMatch: "full",
      },
      {
        path: "add-client",
        component: ReceptionistsAddClientComponent,
      },
      {
        path: "verify",
        component: ReceptionistsVerifyClientComponent,
      },
      {
        path: "appointments",
        component: ReceptionistsAppointmentsDashboardComponent,
      },
      {
        path: "create-appointment",
        component: ReceptionistsCreateAppointmentComponent,
      },
      {
        path: "schedules",
        component: ReceptionistsSchedulesDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionistsRoutingModule {}
