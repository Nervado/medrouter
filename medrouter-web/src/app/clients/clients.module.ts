import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientPageComponent } from "./views/client-page/client-page.component";
import { AppointmentsSummaryComponent } from "./components/appointments-summary/appointments-summary.component";
import { NotificationsSumaryComponent } from "./components/notifications-sumary/notifications-sumary.component";
import { ClientMainChartComponent } from "./components/client-main-chart/client-main-chart.component";

import { SharedModule } from "../shared/shared.module";
import { ClientsRoutingModule } from "./clients-routing.module";
import { DoctorsSearchComponent } from "./components/doctors-search/doctors-search.component";

@NgModule({
  declarations: [
    ClientPageComponent,
    AppointmentsSummaryComponent,
    ClientMainChartComponent,
    NotificationsSumaryComponent,
    DoctorsSearchComponent,
  ],
  imports: [CommonModule, ClientsRoutingModule, SharedModule],
})
export class ClientsModule {}
