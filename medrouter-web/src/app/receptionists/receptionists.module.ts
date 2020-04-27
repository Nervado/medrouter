import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceptionistsPageComponent } from "./views/receptionists-page/receptionists-page.component";
import { ReceptionistsRoutingModule } from "./receptionists-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ReceptionistsPageComponent],
  imports: [CommonModule, ReceptionistsRoutingModule, SharedModule],
})
export class ReceptionistsModule {}
