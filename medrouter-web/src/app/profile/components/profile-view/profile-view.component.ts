import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { UserLogged } from "../../models/logged-user";
import { NotificationService } from "src/app/messages/notification.service";
import { UsersService } from "../../users.service";
import { Profile } from "../../models/user-profile";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.scss"],
})
export class ProfileViewComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {}

  userLogged: UserLogged = null;
  userProfile: Profile = null;
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.userLogged = this.authService.getUser().user;
    this.usersService.getUserById(this.userLogged.userId).subscribe(
      (profile: Profile) => {
        this.userProfile = profile;
      },
      (error) => {
        this.notificationService.notify({
          message: "Algo deu errado =(",
          type: Types.WARN,
        });
      },
      () => {
        this.loading = false;
      }
    );
  }
}
