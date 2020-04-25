import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DoctorPageComponent } from "./views/doctor-page/doctor-page.component";
import { DoctorsRoutingModule } from "./doctors-routing.module";

@NgModule({
  declarations: [DoctorPageComponent],
  imports: [CommonModule, DoctorsRoutingModule],
})
export class DoctorsModule {}
