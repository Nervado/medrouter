import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientPageComponent } from "./views/client-page/client-page.component";
import { AppointmentsSummaryComponent } from "./components/appointments-summary/appointments-summary.component";
import { NotificationsSumaryComponent } from "./components/notifications-sumary/notifications-sumary.component";
import { ClientMainChartComponent } from "./components/client-main-chart/client-main-chart.component";

import { SharedModule } from "../shared/shared.module";
import { ClientsRoutingModule } from "./clients-routing.module";
import { DoctorsSearchComponent } from "./components/doctors-search/doctors-search.component";
import { ClientDashboardComponent } from "./components/client-dashboard/client-dashboard.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { ClientsAddAppointmentComponent } from "./components/clients-add-appointment/clients-add-appointment.component";
import { ClientBarChartComponent } from "./components/client-bar-chart/client-bar-chart.component";
import { ClientExamsDashboardComponent } from './components/client-exams-dashboard/client-exams-dashboard.component';
import { ClientHistoryDashboardComponent } from './components/client-history-dashboard/client-history-dashboard.component';

@NgModule({
  declarations: [
    ClientPageComponent,
    AppointmentsSummaryComponent,
    ClientMainChartComponent,
    NotificationsSumaryComponent,
    DoctorsSearchComponent,
    ClientDashboardComponent,
    ReportsComponent,
    ClientsAddAppointmentComponent,
    ClientBarChartComponent,
    ClientExamsDashboardComponent,
    ClientHistoryDashboardComponent,
  ],
  imports: [CommonModule, ClientsRoutingModule, SharedModule],
})
export class ClientsModule {}
