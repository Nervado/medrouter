import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagersPageComponent } from "./views/managers-page/managers-page.component";

import { ManagersDashboardComponent } from "./components/managers-dashboard/managers-dashboard.component";
import { ManagersLabsDashboardComponent } from "./components/managers-labs-dashboard/managers-labs-dashboard.component";
import { ManagersReceptionistsDashboardComponent } from "./components/managers-receptionists-dashboard/managers-receptionists-dashboard.component";
import { SearchEmployeesComponent } from "../shared/components/search-employees/search-employees.component";
import { Colors } from "../messages/toast/enums/colors";

const routes: Routes = [
  {
    path: "",
    component: ManagersPageComponent,
    children: [
      {
        path: "",
        redirectTo: "receptionists",
        pathMatch: "full",
      },
      {
        path: "search",
        component: SearchEmployeesComponent,
        data: { mainColor: Colors.ADMIN },
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
        component: ManagersReceptionistsDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagersRoutingModule {}
