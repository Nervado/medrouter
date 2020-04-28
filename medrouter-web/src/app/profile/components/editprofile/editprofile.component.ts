import { Component, OnInit } from "@angular/core";
import {
  faUserTie,
  faMapMarkerAlt,
  faStar,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { UserLogged } from "../../models/logged-user";
import { Profile } from "../../models/user-profile";
import { AuthService } from "src/app/auth/auth.service";
import { UsersService } from "../../users.service";
import { NotificationService } from "src/app/messages/notification.service";

@Component({
  selector: "app-editprofile",
  templateUrl: "./editprofile.component.html",
  styleUrls: ["./editprofile.component.scss"],
})
export class EditprofileComponent implements OnInit {
  faUserTie = faUserTie;
  faLocationArrow = faMapMarkerAlt;
  faStar = faStar;

  faTrash = faTrash;
  faEdit = faEdit;

  userLogged: UserLogged = null;
  userProfile: Profile = null;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userProfile = this.usersService.getUserProfile();
    if (!this.userProfile) {
      this.usersService
        .getUserById(this.authService.getUser().user.userId)
        .subscribe((profile: Profile) => (this.userProfile = profile));
    }
  }
}
