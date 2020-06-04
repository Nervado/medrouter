import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, LOCALE_ID } from "@angular/core";
import { AppRoutingModule } from "./routes/app-routing.module";
import { AppComponent } from "./app.component";
import { MessagesModule } from "./messages/messages.module";
import { AuthModule } from "./auth/auth.module";
import { HomeModule } from "./home/home.module";

import localeBr from "@angular/common/locales/pt";
import localeBrExtra from "@angular/common/locales/extra/pt";
import { registerLocaleData } from "@angular/common";

registerLocaleData(localeBr, "pt", localeBrExtra);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    AuthModule.forRoot(), // import with providers
    MessagesModule.forRoot(), // import with providers
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt" }],

  bootstrap: [AppComponent],
})
export class AppModule {}
