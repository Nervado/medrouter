import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "./models/user-profile";
import { MEDROUTER_API } from "../api/app.api";
import { tap } from "rxjs/operators";

import { Avatar } from "./models/avatar.dto";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  profile: Profile = null;
  avatar: Avatar = null;

  constructor(private http: HttpClient) {
    const profile: Profile = JSON.parse(sessionStorage.getItem("profile"));
    if (profile) {
      this.profile = profile;
    }
  }

  getUserById(userId: any): Observable<Profile> {
    return this.http
      .get<Profile>(`${MEDROUTER_API}/users/${userId}`)
      .pipe(this.setProfile());
  }

  update(profile: Profile, userId: any): Observable<Profile> {
    return this.http
      .put<Profile>(`${MEDROUTER_API}/users/${userId}`, { ...profile })
      .pipe(this.setProfile());
  }

  getUserProfile() {
    return this.profile;
  }

  uploadAvatar(any): Observable<Avatar> {
    return this.http.post<any>(`${MEDROUTER_API}/avatars`, any);
  }

  deleteAvatar(avatarId: any): Observable<any> {
    return this.http.delete<any>(`${MEDROUTER_API}/avatars/${avatarId}`);
  }

  setProfile() {
    return tap(
      (profile: Profile) => {
        this.profile = profile;
      },
      () => {
        sessionStorage.setItem("profile", null);
      },
      () => sessionStorage.setItem("profile", JSON.stringify(this.profile))
    );
  }
}
