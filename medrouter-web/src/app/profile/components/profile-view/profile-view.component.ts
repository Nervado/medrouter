import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { UserLogged } from "../../models/logged-user";
import { NotificationService } from "src/app/messages/notification.service";
import { UsersService } from "../../users.service";
import { Profile } from "../../models/user-profile";
import { Types } from "src/app/messages/toast/enums/types";

import { CustomDateParserFormatter } from "../../../shared/components/datepicker/datepicker.component";

import {
  faUserTie,
  faStar,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.scss"],
})
export class ProfileViewComponent implements OnInit {
  parser = new CustomDateParserFormatter();
  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute
  ) {}
  faUserTie = faUserTie;
  faLocationArrow = faMapMarkerAlt;
  faStar = faStar;

  userLogged: UserLogged = null;
  userProfile: Profile = null;
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.activeRoute.parent.params.subscribe({
      next: (params) =>
        this.usersService.getUserById(params["id"]).subscribe(
          (profile: Profile) => {
            this.userProfile = profile;
            this.setStringDate();
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
        ),
    });
  }

  setStringDate() {
    const date = new Date(this.userProfile.birthdate);
    this.userProfile.prettyDate = this.parser.format({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    });
  }
}
