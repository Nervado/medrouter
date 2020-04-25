import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManagersPageComponent } from "./views/managers-page/managers-page.component";
import { ManagersRoutingModule } from "./managers-routing.module";
@NgModule({
  declarations: [ManagersPageComponent],
  imports: [CommonModule, ManagersRoutingModule],
})
export class ManagersModule {}
