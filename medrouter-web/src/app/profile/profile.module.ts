import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilePageComponent } from "./views/profile-page/profile-page.component";
import { SharedModule } from "../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { EditprofileComponent } from "./components/editprofile/editprofile.component";
import { ProfileViewComponent } from "./components/profile-view/profile-view.component";
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { EditAvatarComponent } from './components/edit-avatar/edit-avatar.component';
import { SecurityComponent } from './components/security/security.component';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    EditprofileComponent,
    ProfileViewComponent,
    EditAddressComponent,
    EditAvatarComponent,
    SecurityComponent,
    UnsubscribeComponent,
  ],
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
