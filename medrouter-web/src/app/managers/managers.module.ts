import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManagersPageComponent } from "./views/managers-page/managers-page.component";
import { ManagersRoutingModule } from "./managers-routing.module";
import { SharedModule } from "../shared/shared.module";
import { SearchEmployeesComponent } from "./components/search-employees/search-employees.component";
import { ManagersDashboardComponent } from "./components/managers-dashboard/managers-dashboard.component";
import { ManagersActionsModalComponent } from "./components/managers-actions-modal/managers-actions-modal.component";
import { ManagersLabsDashboardComponent } from "./components/managers-labs-dashboard/managers-labs-dashboard.component";
import { ManagersReceptionistsDashboardComponent } from './components/managers-receptionists-dashboard/managers-receptionists-dashboard.component';
import { ManagersLabsNotificationsComponent } from './components/managers-labs-notifications/managers-labs-notifications.component';
import { ManagersLabsSearchEditComponent } from './components/managers-labs-search-edit/managers-labs-search-edit.component';
import { ManagersLabsChartsComponent } from './components/managers-labs-charts/managers-labs-charts.component';
import { ManagersLabsTopsComponent } from './components/managers-labs-tops/managers-labs-tops.component';

@NgModule({
  declarations: [
    ManagersPageComponent,
    SearchEmployeesComponent,
    ManagersDashboardComponent,
    ManagersActionsModalComponent,
    ManagersLabsDashboardComponent,
    ManagersReceptionistsDashboardComponent,
    ManagersLabsNotificationsComponent,
    ManagersLabsSearchEditComponent,
    ManagersLabsChartsComponent,
    ManagersLabsTopsComponent,
  ],
  imports: [CommonModule, ManagersRoutingModule, SharedModule],
})
export class ManagersModule {}
