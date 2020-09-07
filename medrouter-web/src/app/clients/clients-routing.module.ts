import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientPageComponent } from "./views/client-page/client-page.component";
import { ClientDashboardComponent } from "./components/client-dashboard/client-dashboard.component";
import { ClientExamsDashboardComponent } from "./components/client-exams-dashboard/client-exams-dashboard.component";
import { ClientHistoryDashboardComponent } from "./components/client-history-dashboard/client-history-dashboard.component";
import { NotFoundComponent } from "../home/views/not-found/not-found.component";

const routes: Routes = [
  {
    path: ":id",
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
      {
        path: "exams",
        component: ClientExamsDashboardComponent,
      },
      {
        path: "history",
        component: ClientHistoryDashboardComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
