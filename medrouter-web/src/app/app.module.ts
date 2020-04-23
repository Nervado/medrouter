import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
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
import { AppointmentFormComponent } from "./components/appointment-form/appointment-form.component";
import { AppointmentConfirmModalComponent } from "./components/appointment-confirm-modal/appointment-confirm-modal.component";
import { ProfessionalsCardsComponent } from "./components/professionals-cards/professionals-cards.component";
import { ProfessionalCardComponent } from "./components/professional-card/professional-card.component";
import { MainFooterComponent } from "./components/main-footer/main-footer.component";
import { ClientPageComponent } from "./views/client-page/client-page.component";
import { SignInComponent } from "./views/sign-in/sign-in.component";
import { SignUpComponent } from "./views/sign-up/sign-up.component";
import { AppointmentsSummaryComponent } from "./components/appointments-summary/appointments-summary.component";
import { NotificationsSumaryComponent } from "./components/notifications-sumary/notifications-sumary.component";
import { ClientMainChartComponent } from "./components/client-main-chart/client-main-chart.component";

import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
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
    ProfessionalsCardsComponent,
    ProfessionalCardComponent,
    MainFooterComponent,
    ClientPageComponent,
    SignInComponent,
    SignUpComponent,
    AppointmentsSummaryComponent,
    NotificationsSumaryComponent,
    ClientMainChartComponent,
  ],
  imports: [
    AuthModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt-BR" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
