import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfilePageComponent } from "./views/profile-page/profile-page.component";
import { EditprofileComponent } from "./components/editprofile/editprofile.component";
import { ProfileViewComponent } from "./components/profile-view/profile-view.component";

const routes: Routes = [
  {
    path: "",
    component: ProfilePageComponent,
    children: [
      {
        path: ":id",
        component: ProfileViewComponent,
      },
      {
        path: "editprofile",
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
