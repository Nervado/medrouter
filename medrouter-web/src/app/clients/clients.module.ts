import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ClientPageComponent } from "./views/client-page/client-page.component";

import { AppointmentsSummaryComponent } from "./components/appointments-summary/appointments-summary.component";
import { NotificationsSumaryComponent } from "./components/notifications-sumary/notifications-sumary.component";
import { ClientMainChartComponent } from "./components/client-main-chart/client-main-chart.component";

import { ROUTES } from "./routes";
@NgModule({
  declarations: [
    ClientPageComponent,
    AppointmentsSummaryComponent,
    ClientMainChartComponent,
    NotificationsSumaryComponent,
  ],
  imports: [FontAwesomeModule, CommonModule, RouterModule.forChild(ROUTES)],
})
export class ClientsModule {}
