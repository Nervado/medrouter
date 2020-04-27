import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LaboratoryPageComponent } from "./views/laboratory-page/laboratory-page.component";

const routes: Routes = [{ path: "", component: LaboratoryPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratoriesRoutingModule {}
