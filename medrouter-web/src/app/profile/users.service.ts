import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "./models/user-profile";
import { MEDROUTER_API } from "../api/app.api";
import { tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { NotificationService } from "../messages/notification.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  profile: Profile = null;

  constructor(private http: HttpClient) {}

  getUserById(userId: any): Observable<Profile> {
    return this.http
      .get<Profile>(`${MEDROUTER_API}/users/${userId}`)
      .pipe(tap((profile: Profile) => (this.profile = profile)));
  }
}
