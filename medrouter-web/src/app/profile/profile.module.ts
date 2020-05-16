import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilePageComponent } from "./views/profile-page/profile-page.component";
import { SharedModule } from "../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { EditprofileComponent } from "./components/editprofile/editprofile.component";
import { ProfileViewComponent } from "./components/profile-view/profile-view.component";
import { EditAddressComponent } from "./components/edit-address/edit-address.component";
import { EditAvatarComponent } from "./components/edit-avatar/edit-avatar.component";
import { SecurityComponent } from "./components/security/security.component";
import { UnsubscribeComponent } from "./components/unsubscribe/unsubscribe.component";
import { UnsubscribeModalComponent } from "./components/unsubscribe-modal/unsubscribe-modal.component";
import { ProfileUploadIdComponent } from './profile-upload-id/profile-upload-id.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    EditprofileComponent,
    ProfileViewComponent,
    EditAddressComponent,
    EditAvatarComponent,
    SecurityComponent,
    UnsubscribeComponent,
    UnsubscribeModalComponent,
    ProfileUploadIdComponent,
  ],
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
