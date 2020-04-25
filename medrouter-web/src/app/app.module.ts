import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgModule, LOCALE_ID } from "@angular/core";
import { AppRoutingModule } from "./routes/app-routing.module";
import { AppComponent } from "./app.component";
//import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { MessagesModule } from "./messages/messages.module";
import { AuthModule } from "./auth/auth.module";
import { HomeModule } from "./home/home.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    MessagesModule,
    HomeModule,
    AuthModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt-BR" }],

  bootstrap: [AppComponent],
})
export class AppModule {}
