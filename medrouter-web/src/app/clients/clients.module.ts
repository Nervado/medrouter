import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ClientPageComponent } from "./views/client-page/client-page.component";

import { AppointmentsSummaryComponent } from "./components/appointments-summary/appointments-summary.component";
import { NotificationsSumaryComponent } from "./components/notifications-sumary/notifications-sumary.component";
import { ClientMainChartComponent } from "./components/client-main-chart/client-main-chart.component";

import { ClientsRoutingModule } from "./clients-routing.module";
@NgModule({
  declarations: [
    ClientPageComponent,
    AppointmentsSummaryComponent,
    ClientMainChartComponent,
    NotificationsSumaryComponent,
  ],
  imports: [FontAwesomeModule, CommonModule, ClientsRoutingModule],
})
export class ClientsModule {}
