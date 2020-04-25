import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// components
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomecardsComponent } from "./components/homecards/homecards.component";
import { AppointmentFormComponent } from "./components/appointment-form/appointment-form.component";
import { ProfessionalsCardsComponent } from "./components/professionals-cards/professionals-cards.component";
import { ProfessionalCardComponent } from "./components/professional-card/professional-card.component";
import { MainFooterComponent } from "./components/main-footer/main-footer.component";

// views
import { MainComponent } from "./views/main/main.component";
import { SignInComponent } from "./views/sign-in/sign-in.component";
import { SignUpComponent } from "./views/sign-up/sign-up.component";

@NgModule({
  declarations: [
    MainComponent,
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
  imports: [CommonModule],
})
export class HomeModule {}
