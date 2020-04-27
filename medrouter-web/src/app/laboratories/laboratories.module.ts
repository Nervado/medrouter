import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LaboratoryPageComponent } from "./views/laboratory-page/laboratory-page.component";
import { SharedModule } from "../shared/shared.module";
import { LaboratoriesRoutingModule } from "./laboratories-routing.module";

@NgModule({
  declarations: [LaboratoryPageComponent],
  imports: [CommonModule, SharedModule, LaboratoriesRoutingModule],
})
export class LaboratoriesModule {}
