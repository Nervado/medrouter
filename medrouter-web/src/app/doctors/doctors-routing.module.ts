import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DoctorPageComponent } from "./views/doctor-page/doctor-page.component";

const routes: Routes = [
  {
    path: "",
    component: DoctorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
