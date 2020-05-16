import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientPageComponent } from "./views/client-page/client-page.component";
import { ClientDashboardComponent } from "./components/client-dashboard/client-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: ClientPageComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        component: ClientDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
