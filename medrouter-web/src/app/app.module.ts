import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgModule, LOCALE_ID } from "@angular/core";
import { AppRoutingModule } from "./routes/app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { SharedModule } from "./shared/shared.module";
import { MessagesModule } from "./messages/messages.module";
import { AuthModule } from "./auth/auth.module";
import { HomeModule } from "./home/home.module";
import { ClientsModule } from "./clients/clients.module";
import { DoctorsModule } from "./doctors/doctors.module";
import { ManagersModule } from "./managers/managers.module";
import { OwnersModule } from "./owners/owners.module";
import { ReceptionistsModule } from "./receptionists/receptionists.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    MessagesModule,
    ClientsModule,
    DoctorsModule,
    ManagersModule,
    OwnersModule,
    ReceptionistsModule,
    HomeModule,
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
