import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientPageComponent } from "./views/client-page/client-page.component";

const routes: Routes = [{ path: "", component: ClientPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
