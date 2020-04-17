import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HomeComponent } from "./views/home/home.component";
import { HomecardsComponent } from "./components/homecards/homecards.component";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AppointmentConfirmModalComponent } from './components/appointment-confirm-modal/appointment-confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomecardsComponent,
    DatepickerComponent,
    AppointmentFormComponent,
    AppointmentConfirmModalComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt-BR" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
