import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LaboratoryPageComponent } from "./views/laboratory-page/laboratory-page.component";
import { LabDashboardComponent } from "./components/lab-dashboard/lab-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: LaboratoryPageComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        component: LabDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratoriesRoutingModule {}
