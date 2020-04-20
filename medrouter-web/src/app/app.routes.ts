import { Routes } from "@angular/router";
import { HomeComponent } from "./views/home/home.component";
import { SignInComponent } from "./views/sign-in/sign-in.component";
import { SignUpComponent } from "./views/sign-up/sign-up.component";
import { ClientPageComponent } from "./views/client-page/client-page.component";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "auth/signin", component: SignInComponent },
  { path: "auth/signup", component: SignUpComponent },
  { path: "clients", component: ClientPageComponent },
];
