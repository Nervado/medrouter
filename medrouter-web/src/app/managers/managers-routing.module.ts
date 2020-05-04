import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagersPageComponent } from "./views/managers-page/managers-page.component";
import { SearchEmployeesComponent } from "./components/search-employees/search-employees.component";
import { ManagersDashboardComponent } from "./components/managers-dashboard/managers-dashboard.component";
import { ManagersLabsDashboardComponent } from "./components/managers-labs-dashboard/managers-labs-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: ManagersPageComponent,
    children: [
      {
        path: "",
        redirectTo: "labs",
        pathMatch: "full",
      },
      {
        path: "search",
        component: SearchEmployeesComponent,
      },
      {
        path: "dashboard",
        component: ManagersDashboardComponent,
      },
      {
        path: "labs",
        component: ManagersLabsDashboardComponent,
      },
      {
        path: "receptionists",
        component: ManagersLabsDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagersRoutingModule {}
