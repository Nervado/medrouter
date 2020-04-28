import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "./models/user-profile";
import { MEDROUTER_API } from "../api/app.api";
import { tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { NotificationService } from "../messages/notification.service";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  profile: Profile = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    const profile: Profile = JSON.parse(sessionStorage.getItem("profile"));
    if (profile) {
      this.profile = profile;
    }
  }

  getUserById(userId: any): Observable<Profile> {
    return this.http.get<Profile>(`${MEDROUTER_API}/users/${userId}`).pipe(
      tap(
        (profile: Profile) => (this.profile = profile),

        () => {
          sessionStorage.setItem("profile", null); // on error clear user from local storage
        },
        () => {
          sessionStorage.setItem("profile", JSON.stringify(this.profile));
        }
      )
    );
  }

  getUserProfile() {
    return this.profile;
  }
}
