import { Routes } from "@angular/router";
import { HomeComponent } from "../home/views/home/home.component";
import { NotFoundComponent } from "../home/views/not-found/not-found.component";
import { SignInComponent } from "../home/views/sign-in/sign-in.component";
import { SignUpComponent } from "../home/views/sign-up/sign-up.component";
import { ClientGuard } from "../auth/guard/client.guard";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "auth/signin/:to", component: SignInComponent },
  { path: "auth/signin", component: SignInComponent },
  { path: "auth/signup", component: SignUpComponent },
  {
    path: "clients",
    loadChildren: () =>
      import("../clients/clients.module").then((m) => m.ClientsModule),
    canLoad: [ClientGuard],
  },

  {
    path: "doctors",
    loadChildren: () =>
      import("../doctors/doctors.module").then((m) => m.DoctorsModule),
  },

  {
    path: "managers",
    loadChildren: () =>
      import("../managers/managers.module").then((m) => m.ManagersModule),
  },
  /*
  {
    path: "owners",
    loadChildren: () =>
      import("../owners/owners.module").then((m) => m.OwnersModule),
  },
  {
    path: "receptionists",
    loadChildren: () =>
      import("../receptionists/receptionists.module").then(
        (m) => m.ReceptionistsModule
      ),
  },
  */

  {
    path: "**",
    component: NotFoundComponent,
  },
];
