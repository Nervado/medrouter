import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InputComponent } from "./components/input/input.component";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { AppointmentConfirmModalComponent } from "./components/appointment-confirm-modal/appointment-confirm-modal.component";
import { UserSnippetComponent } from "./components/user-snippet/user-snippet.component";
import { UserSnippetMenuComponent } from "./components/user-snippet-menu/user-snippet-menu.component";
import { ToolBarComponent } from "./components/tool-bar/tool-bar.component";
import { WrapperComponent } from "./components/wrapper/wrapper.component";
import { MenubarComponent } from "./components/menubar/menubar.component";
import { WrapperContentComponent } from "./components/wrapper-content/wrapper-content.component";
import { WrapperComponentComponent } from "./components/wrapper-component/wrapper-component.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { RadioComponent } from "./components/radio/radio.component";
import { MultSelectorDropDrownComponent } from "./components/mult-selector-drop-drown/mult-selector-drop-drown.component";
import { CelMaskDirective } from "./directives/cel-mask.directive";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CpfMaskDirective } from "./directives/cpf-mask.directive";
import { CepMaskDirective } from "./directives/cep-mask.directive";
import { MultiListViewComponent } from "./components/multi-list-view/multi-list-view.component";
import { CnpjMaskDirective } from "./directives/cnpj-mask.directive";
import { PressureMaskDirective } from "./directives/pressure-mask.directive";
import { ExamViewComponent } from "./components/exam-view/exam-view.component";
import { RecomViewComponent } from "./components/recom-view/recom-view.component";
import { MedicineViewComponent } from "./components/medicine-view/medicine-view.component";
import { MessagesModule } from "../messages/messages.module";
@NgModule({
  declarations: [
    InputComponent,
    DatepickerComponent,
    AppointmentConfirmModalComponent,
    UserSnippetComponent,
    UserSnippetMenuComponent,
    ToolBarComponent,
    WrapperComponent,
    MenubarComponent,
    WrapperContentComponent,
    WrapperComponentComponent,
    LoadingComponent,
    RadioComponent,
    MultSelectorDropDrownComponent,
    CelMaskDirective,
    CpfMaskDirective,
    CepMaskDirective,
    MultiListViewComponent,
    CnpjMaskDirective,
    PressureMaskDirective,
    ExamViewComponent,
    RecomViewComponent,
    MedicineViewComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CurrencyMaskModule,
    MessagesModule,
  ],
  exports: [
    InputComponent,
    CommonModule,
    DatepickerComponent,
    AppointmentConfirmModalComponent,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    UserSnippetComponent,
    ToolBarComponent,
    WrapperComponent,
    WrapperContentComponent,
    WrapperComponentComponent,
    MenubarComponent,
    LoadingComponent,
    RadioComponent,
    MultSelectorDropDrownComponent,
    CelMaskDirective,
    CurrencyMaskModule,
    CpfMaskDirective,
    CepMaskDirective,
    CnpjMaskDirective,
    PressureMaskDirective,
    MultiListViewComponent,
    RecomViewComponent,
    MedicineViewComponent,
    ExamViewComponent,
  ],
})
export class SharedModule {}
