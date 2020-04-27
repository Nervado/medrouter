import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReceptionistsPageComponent } from "./views/receptionists-page/receptionists-page.component";

const routes: Routes = [
  {
    path: "",
    component: ReceptionistsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionistsRoutingModule {}
