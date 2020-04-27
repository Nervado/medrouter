import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilePageComponent } from "./views/profile-page/profile-page.component";
import { SharedModule } from "../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { EditprofileComponent } from './components/editprofile/editprofile.component';

@NgModule({
  declarations: [ProfilePageComponent, EditprofileComponent],
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
