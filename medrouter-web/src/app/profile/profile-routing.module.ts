import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfilePageComponent } from "./views/profile-page/profile-page.component";
import { EditprofileComponent } from "./components/editprofile/editprofile.component";
import { ProfileViewComponent } from "./components/profile-view/profile-view.component";
import { EditAddressComponent } from "./components/edit-address/edit-address.component";
import { EditAvatarComponent } from "./components/edit-avatar/edit-avatar.component";
import { SecurityComponent } from "./components/security/security.component";
import { UnsubscribeComponent } from "./components/unsubscribe/unsubscribe.component";
import { ProfileUploadIdComponent } from "./profile-upload-id/profile-upload-id.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full",
  },
  {
    path: ":id",
    component: ProfilePageComponent,
    children: [
      {
        path: "",
        redirectTo: "profile-view",
        pathMatch: "full",
      },
      {
        path: "profile-view",
        component: ProfileViewComponent,
      },
      {
        path: "edit-profile",
        component: EditprofileComponent,
      },
      {
        path: "edit-address",
        component: EditAddressComponent,
      },
      {
        path: "edit-avatar",
        component: EditAvatarComponent,
      },
      {
        path: "security",
        component: SecurityComponent,
      },
      {
        path: "unsubscribe",
        component: UnsubscribeComponent,
      },
      {
        path: "identification",
        component: ProfileUploadIdComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
