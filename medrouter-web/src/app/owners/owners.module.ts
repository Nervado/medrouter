import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OwnersPageComponent } from "./views/owners-page/owners-page.component";
import { SharedModule } from "../shared/shared.module";
import { OwnersRoutingModule } from "./owners-routing.module";

@NgModule({
  declarations: [OwnersPageComponent],
  imports: [CommonModule, SharedModule, OwnersRoutingModule],
})
export class OwnersModule {}
