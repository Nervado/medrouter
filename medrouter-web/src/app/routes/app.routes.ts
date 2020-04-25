import { Routes } from "@angular/router";
import { MainComponent } from "../Home/views/main/main.component";
import { SignInComponent } from "../Home/views/sign-in/sign-in.component";
import { SignUpComponent } from "../Home/views/sign-up/sign-up.component";
import { ClientPageComponent } from "../Clients/views/client-page/client-page.component";

export const ROUTES: Routes = [
  { path: "", component: MainComponent },
  { path: "auth/signin", component: SignInComponent },
  { path: "auth/signup", component: SignUpComponent },
  { path: "clients", component: ClientPageComponent },
];
