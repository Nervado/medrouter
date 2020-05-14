import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LaboratoryPageComponent } from "./views/laboratory-page/laboratory-page.component";
import { SharedModule } from "../shared/shared.module";
import { LaboratoriesRoutingModule } from "./laboratories-routing.module";
import { LabDashboardComponent } from './components/lab-dashboard/lab-dashboard.component';
import { LabEditExamComponent } from './components/lab-edit-exam/lab-edit-exam.component';
import { SeachEditExamComponent } from './components/seach-edit-exam/seach-edit-exam.component';
import { LabAddExamModalComponent } from './components/lab-add-exam-modal/lab-add-exam-modal.component';

@NgModule({
  declarations: [LaboratoryPageComponent, LabDashboardComponent, LabEditExamComponent, SeachEditExamComponent, LabAddExamModalComponent],
  imports: [CommonModule, SharedModule, LaboratoriesRoutingModule],
})
export class LaboratoriesModule {}
