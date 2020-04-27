import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManagersPageComponent } from "./views/managers-page/managers-page.component";
import { ManagersRoutingModule } from "./managers-routing.module";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  declarations: [ManagersPageComponent],
  imports: [CommonModule, ManagersRoutingModule, SharedModule],
})
export class ManagersModule {}
