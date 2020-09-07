import { Routes } from "@angular/router";
import { HomeComponent } from "../home/views/home/home.component";
import { NotFoundComponent } from "../home/views/not-found/not-found.component";
import { SignInComponent } from "../home/views/sign-in/sign-in.component";
import { SignUpComponent } from "../home/views/sign-up/sign-up.component";
import { ClientGuard } from "../auth/guards/client.guard";
import { Role } from "../auth/enums/roles-types";
import { RoleGuard } from "../auth/guards/role.guard";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "auth/signin/:to", component: SignInComponent },
  { path: "auth/signin", component: SignInComponent },
  { path: "auth/signup", component: SignUpComponent },
  {
    path: "clients",
    loadChildren: () =>
      import("../clients/clients.module").then((m) => m.ClientsModule),
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data: { roles: [Role.CLIENT] },
  },

  {
    path: "doctors",
    loadChildren: () =>
      import("../doctors/doctors.module").then((m) => m.DoctorsModule),
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data: { roles: [Role.DOCTOR] },
  },

  {
    path: "managers",
    loadChildren: () =>
      import("../managers/managers.module").then((m) => m.ManagersModule),
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data: { roles: [Role.MANAGER] },
  },

  {
    path: "owners",
    loadChildren: () =>
      import("../owners/owners.module").then((m) => m.OwnersModule),
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data: { roles: [Role.OWNER] },
  },
  {
    path: "receptionists",
    loadChildren: () =>
      import("../receptionists/receptionists.module").then(
        (m) => m.ReceptionistsModule
      ),
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data: { roles: [Role.RECEPT] },
  },
  {
    path: "laboratories",
    loadChildren: () =>
      import("../laboratories/laboratories.module").then(
        (m) => m.LaboratoriesModule
      ),
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data: { roles: [Role.LAB] },
  },
  {
    path: "profile",
    loadChildren: () =>
      import("../profile/profile.module").then((m) => m.ProfileModule),
    canLoad: [ClientGuard],
    canActivate: [ClientGuard],
    data: { roles: [Role.CLIENT] },
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
