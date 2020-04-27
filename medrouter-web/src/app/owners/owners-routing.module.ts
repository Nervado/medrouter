import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OwnersPageComponent } from "./views/owners-page/owners-page.component";

const routes: Routes = [
  {
    path: "",
    component: OwnersPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersRoutingModule {}
