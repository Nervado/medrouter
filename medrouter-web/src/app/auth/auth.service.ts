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
import { Types } from "../messages/toast/enums/types";
import { Role } from "./enums/roles-types";
import { NewAuth } from "./interfaces/newauth.dto";
import { SignOutDto } from "../profile/models/sign-out.dto";
import { RolesIds } from "./dto/roles-ids.dto";
import { isThursday } from "date-fns";
import { ro } from "date-fns/locale";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: User;
  defaultRoute: string;
  loginDto: Login;
  rolesIds: RolesIds[] = [];

  constructor(private http: HttpClient, private router: Router) {
    const usersaved: User = JSON.parse(localStorage.getItem("user"));
    const loginsaved: User = JSON.parse(localStorage.getItem("login"));
    if (usersaved) {
      this.user = usersaved;
    }
    if (loginsaved) {
      this.loginDto = JSON.parse(localStorage.getItem("login"));
    }
  }

  isloggedIn() {
    return this.user !== undefined;
  }

  login(login: Login): Observable<User> {
    return this.http
      .post<User>(`${MEDROUTER_API}/auth/signin`, { ...login })
      .pipe(
        tap(
          (User) => {
            this.user = User;
            this.loginDto = login;

            this.defaultRoute = DefaultRoutes[User.user.role[0]]; // setup default route
          },
          () => {
            localStorage.setItem("user", null); // on error clear user from local storage
          },
          () => {
            if (login.rememberme) {
              localStorage.setItem("user", JSON.stringify(this.user));
              localStorage.setItem("login", JSON.stringify(this.loginDto));
            }

            this.user.user.role.forEach((rol) =>
              this.getRulesId(rol).subscribe({
                complete: () =>
                  localStorage.setItem(
                    "rulesIds",
                    JSON.stringify(this.rolesIds)
                  ),
              })
            );
          }
        )
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
    this.user = undefined;
    localStorage.removeItem("user");
    localStorage.removeItem("login");
    this.router.navigate(["/"]);
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
          console.log("Update user", User);
        })
      );
  }

  getRulesId(rol: Role): Observable<any> {
    const query = rol === Role.RECEPT ? `receptionist` : rol;
    return this.http
      .get<any>(`${MEDROUTER_API}/${query}s/${this.user.user.userId}`)
      .pipe(
        tap((profile: any) => {
          this.rolesIds.push({ role: rol, id: profile.id });
        })
      );
  }

  public getRuleId(role: Role): any {
    if (this.rolesIds.length > 0) {
      return this.rolesIds.filter((rol) => rol.role === role)[0]?.id;
    } else {
      return JSON.parse(localStorage.getItem("rulesIds")).filter(
        (rol) => rol.role === role
      )[0]?.id;
    }
  }
}
