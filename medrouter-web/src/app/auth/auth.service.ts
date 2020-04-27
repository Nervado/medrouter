import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { MEDROUTER_API } from "../api/app.api";

import { User } from "./models/user.model";
import { Login } from "./models/login.model";
import { SignUp } from "./models/signup.model";

import { NotificationService } from "../messages/notification.service";

import { DefaultRoutes } from "./enums/default-routes";
import { Types } from "../messages/toast/enums/types";
import { Role } from "./enums/roles-types";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: User;
  defaultRoute: string;

  constructor(private http: HttpClient, private router: Router) {
    const usersaved: User = JSON.parse(localStorage.getItem("user"));
    if (usersaved) {
      this.user = usersaved;
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
            //  super user for tests
            User.user.role = [
              Role.ADMIN,
              Role.CLIENT,
              Role.OWNER,
              Role.DOCTOR,
              Role.LAB,
              Role.RECEPT,
            ];

            this.defaultRoute = DefaultRoutes[User.user.role[0]]; // setup default route
            console.log(this.defaultRoute);
          },
          () => {
            localStorage.setItem("user", null); // on error clear user from local storage
          },
          () => {
            if (login.rememberme) {
              localStorage.setItem("user", JSON.stringify(this.user));
            }
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

    console.log(allow);
    return allow;
  }
}
