import { Routes } from "@angular/router";
import { MainComponent } from "../home/views/main/main.component";
import { SignInComponent } from "../home/views/sign-in/sign-in.component";
import { SignUpComponent } from "../home/views/sign-up/sign-up.component";
import { ClientPageComponent } from "../clients/views/client-page/client-page.component";

export const ROUTES: Routes = [
  { path: "", component: MainComponent },
  { path: "auth/signin", component: SignInComponent },
  { path: "auth/signup", component: SignUpComponent },
  { path: "clients", component: ClientPageComponent },
];
