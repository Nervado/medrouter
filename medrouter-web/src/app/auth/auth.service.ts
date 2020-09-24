import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { MEDROUTER_API } from "../api/app.api";

import { User } from "./models/user.model";
import { Login } from "./models/login.model";
import { SignUp } from "./models/signup.model";

import { DefaultRoutes } from "./enums/default-routes";
import { Role } from "./enums/roles-types";
import { NewAuth } from "./interfaces/newauth.dto";
import { RolesIds } from "./dto/roles-ids.dto";
import { CriptoService } from "./cripto.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: User;
  defaultRoute: string;
  loginDto: Login;
  rolesIds: RolesIds[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cryptoService: CriptoService
  ) {
    const usersaved = this.cryptoService.decryptData(
      localStorage.getItem("MEDROUTER_CONFIG")
    );

    if (usersaved) {
      this.user = usersaved;
    }
  }

  isloggedIn() {
    return this.user !== undefined;
  }

  getAccessToken() {
    return this.user?.token || undefined;
  }

  login(login: Login): Observable<User> {
    this.clearUserData();
    return this.http
      .post<User>(`${MEDROUTER_API}/auth/signin`, { ...login })
      .pipe(
        tap(
          (User) => {
            this.user = User;
            this.loginDto = login;
          },
          (error) => {
            localStorage.removeItem("MEDROUTER_CONFIG"); // on error clear user from local storage
          },
          () => {
            if (login.rememberme) {
              localStorage.setItem(
                "MEDROUTER_CONFIG",
                this.cryptoService.encryptData(this.user)
              );
            }
          }
        )
      );
  }

  getUserPermissions() {
    this.user.user.role.forEach(
      async (rol, i) =>
        await this.getRulesId(rol).subscribe({
          next: (resp) => {
            if (resp !== null) {
              this.rolesIds.push({ role: rol, id: resp.id });
            }

            if (i === this.user.user.role.length - 1) {
              if (this.loginDto.rememberme) {
                localStorage.setItem(
                  "MEDROUTER_ROLES",
                  this.cryptoService.encryptData(this.rolesIds)
                );
              }

              this.defaultRoute = DefaultRoutes[this.user.user.role[0]]; // setup default route
              this.router.navigate([
                this.defaultRoute,
                this.getRuleId(this.user.user.role[0]),
              ]);
            }
          },
        })
    );
  }

  signUp(signUp: SignUp): Observable<void> {
    return this.http.post<void>(`${MEDROUTER_API}/auth/signup`, {
      ...signUp,
    });
  }

  handlelogin(url?: string) {
    this.router.navigate(["/auth/signin", url]);
  }

  getUser(): User {
    return this.user;
  }

  logout() {
    this.clearUserData();
    this.router.navigate(["/"]);
  }

  clearUserData() {
    localStorage.removeItem("MEDROUTER_CONFIG");
    localStorage.removeItem("MEDROUTER_ROLES");
    this.user = undefined;
    this.rolesIds = [];
  }

  subscribe() {
    this.router.navigate(["/auth/signup"]);
  }

  session() {
    this.router.navigate(["/auth/signin"]);
  }

  findAllowableRoutes(path: string) {
    // allowable routes to current user
    const allowableRoutes = this.user.user.role.map(
      (role) => DefaultRoutes[role]
    );

    const allow = allowableRoutes.find((route) => route === `${path}`);

    return allow;
  }

  patch(newAuth: NewAuth): Observable<User> {
    return this.http
      .patch<User>(`${MEDROUTER_API}/auth/signup`, {
        ...newAuth,
      })
      .pipe(
        tap((User) => {
          this.user = User;
        })
      );
  }

  getRulesId(rol: Role): Observable<any> {
    const query = rol === Role.RECEPT ? `receptionist` : rol;
    return this.http.get<any>(
      `${MEDROUTER_API}/${query}s/${this.user?.user.userId}`
    );
  }

  public getRuleId(role: Role): any {
    if (this.rolesIds.length > 0) {
      return this.rolesIds.filter((rol) => rol.role === role)[0]?.id;
    } else {
      const rules = this.cryptoService.decryptData(
        localStorage.getItem("MEDROUTER_ROLES")
      );

      if (rules) {
        return rules.filter((rol) => rol.role === role)[0]?.id;
      } else {
        return "";
      }
    }
  }
}
