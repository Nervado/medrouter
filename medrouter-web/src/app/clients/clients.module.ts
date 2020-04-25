import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientPageComponent } from "./views/client-page/client-page.component";

import { AppointmentsSummaryComponent } from "./components/appointments-summary/appointments-summary.component";
import { NotificationsSumaryComponent } from "./components/notifications-sumary/notifications-sumary.component";
import { ClientMainChartComponent } from "./components/client-main-chart/client-main-chart.component";

@NgModule({
  declarations: [
    ClientPageComponent,
    AppointmentsSummaryComponent,
    ClientMainChartComponent,
    NotificationsSumaryComponent,
  ],
  imports: [CommonModule],
})
export class ClientsModule {}
