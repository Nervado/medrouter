import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "./models/user-profile";
import { MEDROUTER_API } from "../api/app.api";
import { tap } from "rxjs/operators";

import { Avatar } from "./models/avatar.dto";
import { AuthService } from "../auth/auth.service";
import { SearchFilterDto } from "../owners/components/search-employees/dtos/search-filter.dto";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  profile: Profile = null;
  avatar: Avatar = null;

  constructor(private http: HttpClient, private authService: AuthService) {
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
      () => {
        sessionStorage.setItem("profile", JSON.stringify(this.profile));
      }
    );
  }

  delete(userId: any): Observable<void> {
    return this.http.delete<void>(`${MEDROUTER_API}/users/${userId}`).pipe(
      tap({
        complete: () => sessionStorage.removeItem("profile"),
      })
    );
  }

  search(page: number): Observable<Array<Profile>> {
    return this.http.get<Array<Profile>>(`${MEDROUTER_API}/users?page=${page}`);
  }

  searchByName(search: SearchFilterDto): Observable<Array<Profile>> {
    let query = search.username ? `&username=${search.username}` : "";
    query = search.sex ? `${query}&sex=${search.sex}` : query;
    query = search.role ? `${query}&role=${search.role}` : query;
    query = search.ishired ? `${query}&ishired=${search.ishired}` : query;

    return this.http.get<Array<Profile>>(
      `${MEDROUTER_API}/users/search?page=${search.page}${query}`
    );
  }
}
