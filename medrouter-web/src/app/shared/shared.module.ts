import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  FormsModule,
  ReactiveFormsModule,
  SelectMultipleControlValueAccessor,
} from "@angular/forms";
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
//import { SearchEmployeesComponent } from "./components/search-employees/search-employees.component";
//import { ManagersActionsModalComponent } from "./components/managers-actions-modal/managers-actions-modal.component";

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
    // ManagersActionsModalComponent,
    // SearchEmployeesComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
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
    //SearchEmployeesComponent,
    //ManagersActionsModalComponent,
  ],
})
export class SharedModule {}
