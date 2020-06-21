import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagersPageComponent } from "./views/managers-page/managers-page.component";
import { ManagersLabsDashboardComponent } from "./components/managers-labs-dashboard/managers-labs-dashboard.component";
import { SearchEmployeesComponent } from "./components/search-employees/search-employees.component";
import { Colors } from "../messages/toast/enums/colors";
import { ManagersReceptionistsSearchEditComponent } from "./components/managers-receptionists-search-edit/managers-receptionists-search-edit.component";

const routes: Routes = [
  {
    path: "",
    component: ManagersPageComponent,
    children: [
      {
        path: "",
        redirectTo: "search",
        pathMatch: "full",
      },
      {
        path: "search",
        component: SearchEmployeesComponent,
        data: { mainColor: Colors.ADMIN },
      },

      {
        path: "labs",
        component: ManagersLabsDashboardComponent,
      },
      {
        path: "receptionists",
        component: ManagersReceptionistsSearchEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagersRoutingModule {}
