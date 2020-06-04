import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OwnersPageComponent } from "./views/owners-page/owners-page.component";
import { SharedModule } from "../shared/shared.module";
import { OwnersRoutingModule } from "./owners-routing.module";
import { OwnersDasboardComponent } from "./components/owners-dasboard/owners-dasboard.component";
import { OwnersDoctorsDashboardComponent } from "./components/owners-doctors-dashboard/owners-doctors-dashboard.component";
import { OwnersManagersDasboardComponent } from "./components/owners-managers-dasboard/owners-managers-dasboard.component";
import { OwnersDasboardSearchEditComponent } from "./components/owners-dasboard-search-edit/owners-dasboard-search-edit.component";
import { OwnersEmployeeDismissModalComponent } from "./components/owners-employee-dismiss-modal/owners-employee-dismiss-modal.component";
import { OwnersEmployeeEditModalComponent } from "./components/owners-employee-edit-modal/owners-employee-edit-modal.component";
import { DonutChartComponent } from "./components/donut-chart/donut-chart.component";
import { ClientBarChartComponent } from "./components/client-bar-chart/client-bar-chart.component";
import { SearchEmployeesComponent } from "./components/search-employees/search-employees.component";
import { ManagersActionsModalComponent } from "./components/managers-actions-modal/managers-actions-modal.component";
//import { LOCALE_ID } from "@angular/core";

@NgModule({
  declarations: [
    OwnersPageComponent,
    OwnersDasboardComponent,
    OwnersDoctorsDashboardComponent,
    OwnersManagersDasboardComponent,
    OwnersDasboardSearchEditComponent,
    OwnersEmployeeDismissModalComponent,
    OwnersEmployeeEditModalComponent,
    DonutChartComponent,
    ClientBarChartComponent,
    SearchEmployeesComponent,
    ManagersActionsModalComponent,
  ],
  imports: [CommonModule, SharedModule, OwnersRoutingModule],
  //providers: [{ provide: LOCALE_ID, useValue: "pt" }],
})
export class OwnersModule {}
