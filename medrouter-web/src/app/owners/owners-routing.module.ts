import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OwnersPageComponent } from "./views/owners-page/owners-page.component";
import { OwnersDasboardComponent } from "./components/owners-dasboard/owners-dasboard.component";
import { OwnersDoctorsDashboardComponent } from "./components/owners-doctors-dashboard/owners-doctors-dashboard.component";
import { OwnersManagersDasboardComponent } from "./components/owners-managers-dasboard/owners-managers-dasboard.component";
import { SearchEmployeesComponent } from "./components/search-employees/search-employees.component";
import { Colors } from "../messages/toast/enums/colors";
import { OwnersDasboardSearchEditComponent } from "./components/owners-dasboard-search-edit/owners-dasboard-search-edit.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full",
  },
  {
    path: ":id",
    component: OwnersPageComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },

      {
        path: "dashboard",
        component: OwnersDasboardComponent,
      },

      {
        path: "doctors",
        component: OwnersDoctorsDashboardComponent,
      },
      {
        path: "managers",
        component: OwnersManagersDasboardComponent,
      },
      {
        path: "owners",
        component: OwnersDasboardSearchEditComponent,
      },
      {
        path: "search",
        component: SearchEmployeesComponent,
        data: { mainColor: Colors.OWNER },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersRoutingModule {}
