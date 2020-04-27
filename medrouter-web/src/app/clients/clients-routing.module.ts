import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientPageComponent } from "./views/client-page/client-page.component";
import { ClientDashboardComponent } from "./components/client-dashboard/client-dashboard.component";

import { NewscheduleComponent } from "./components/newschedule/newschedule.component";

const routes: Routes = [
  {
    path: "",
    component: ClientPageComponent,
    children: [
      {
        path: "",
        component: ClientDashboardComponent,
      },
      {
        path: "new",
        component: NewscheduleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
