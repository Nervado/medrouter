import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagersPageComponent } from "./views/managers-page/managers-page.component";

const routes: Routes = [
  {
    path: "",
    component: ManagersPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagersRoutingModule {}
