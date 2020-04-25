import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// components
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomecardsComponent } from "./components/homecards/homecards.component";
import { AppointmentFormComponent } from "./components/appointment-form/appointment-form.component";
import { ProfessionalsCardsComponent } from "./components/professionals-cards/professionals-cards.component";
import { ProfessionalCardComponent } from "./components/professional-card/professional-card.component";
import { MainFooterComponent } from "./components/main-footer/main-footer.component";

// views
import { HomeComponent } from "./views/home/home.component";
import { SignInComponent } from "./views/sign-in/sign-in.component";
import { SignUpComponent } from "./views/sign-up/sign-up.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    HomecardsComponent,
    AppointmentFormComponent,
    ProfessionalCardComponent,
    ProfessionalsCardsComponent,
    MainFooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
