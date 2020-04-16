import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [NgbModule, BrowserModule, FontAwesomeModule],
  providers: [{ provide: LOCALE_ID, useValue: "pt-BR" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
