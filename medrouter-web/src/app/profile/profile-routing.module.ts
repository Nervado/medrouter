import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfilePageComponent } from "./views/profile-page/profile-page.component";
import { EditprofileComponent } from "./components/editprofile/editprofile.component";

const routes: Routes = [
  {
    path: "",
    component: ProfilePageComponent,
    children: [
      {
        path: "",
        component: EditprofileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
