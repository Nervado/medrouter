import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LaboratoryPageComponent } from "./views/laboratory-page/laboratory-page.component";
import { LabDashboardComponent } from "./components/lab-dashboard/lab-dashboard.component";
import { LabEditExamComponent } from "./components/lab-edit-exam/lab-edit-exam.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full",
  },
  {
    path: ":id",
    component: LaboratoryPageComponent,
    children: [
      {
        path: "",
        redirectTo: "exams",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        component: LabDashboardComponent,
      },

      {
        path: "exams",
        component: LabEditExamComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratoriesRoutingModule {}
