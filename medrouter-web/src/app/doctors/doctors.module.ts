import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DoctorPageComponent } from "./views/doctor-page/doctor-page.component";

import { ROUTES } from "./routes";

@NgModule({
  declarations: [DoctorPageComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class DoctorsModule {}
