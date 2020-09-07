import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "./models/user-profile";
import { MEDROUTER_API } from "../api/app.api";
import { tap } from "rxjs/operators";

import { Avatar } from "./models/avatar.dto";
import { AuthService } from "../auth/auth.service";
import { SearchFilterDto } from "../owners/components/search-employees/dtos/search-filter.dto";
import { CriptoService } from "../auth/cripto.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  profile: Profile = null;
  avatar: Avatar = null;

  constructor(
    private http: HttpClient,
    private cryptoService: CriptoService,
    private authService: AuthService
  ) {
    const profile: Profile = this.cryptoService.decryptData(
      sessionStorage.getItem("MEDROUTER_DATA")
    );
    if (profile) {
      this.profile = profile;
    } else {
    }
  }

  getUserById(userId: string): Observable<Profile> {
    return this.http
      .get<Profile>(`${MEDROUTER_API}/users/${userId}`)
      .pipe(this.setProfile());
  }

  update(profile: Profile, userId: string): Observable<Profile> {
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

  uploadDocumentPhoto(file: any): Observable<any> {
    return this.http.post<any>(`${MEDROUTER_API}/photos`, file);
  }

  deleteDocumentPhoto(id: string): Observable<any> {
    return this.http.delete<any>(`${MEDROUTER_API}/photos/${id}`);
  }

  updateClientDoc(id: string, doc: any): Observable<void> {
    return this.http.patch<void>(`${MEDROUTER_API}/clients/${id}`, { ...doc });
  }

  deleteAvatar(avatarId: any): Observable<any> {
    return this.http.delete<any>(`${MEDROUTER_API}/avatars/${avatarId}`);
  }

  clearProfile() {
    sessionStorage.removeItem("MEDROUTER_DATA");
  }
  setProfile() {
    return tap(
      (profile: Profile) => {
        this.profile = profile;
      },
      () => {
        sessionStorage.removeItem("MEDROUTER_DATA");
      },
      () => {
        if (this.authService.loginDto?.rememberme) {
          sessionStorage.setItem(
            "MEDROUTER_DATA",
            this.cryptoService.encryptData(this.profile)
          );
        }
      }
    );
  }

  delete(userId: string): Observable<void> {
    return this.http.delete<void>(`${MEDROUTER_API}/users/${userId}`).pipe(
      tap({
        complete: () => sessionStorage.removeItem("MEDROUTER_DATA"),
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
    query = search.checked ? `${query}&checked=${search.checked}` : query;

    return this.http.get<Array<Profile>>(
      `${MEDROUTER_API}/users/search?page=${search.page}${query}`
    );
  }
}
