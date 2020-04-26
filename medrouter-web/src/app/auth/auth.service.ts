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

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: User;
  defaultRoute: string;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {}

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
            this.defaultRoute = DefaultRoutes[User.user.role[0]];
          },
          () => {},
          () => {
            localStorage.setItem("User", this.user.user.username);
            localStorage.setItem("Role", this.user.user.role[0]);
            localStorage.setItem("userId", this.user.user.userId.toString());
          }
        )
      );
  }

  signUp(signUp: SignUp): Observable<void> {
    return this.http
      .post<void>(`${MEDROUTER_API}/auth/signup`, {
        ...signUp,
      })
      .pipe(
        tap(
          () =>
            this.notificationService.notify({
              message: "Cadastro realizado com sucesso, verifique seu email!",
              type: Types.INFO,
            }),
          () =>
            this.notificationService.notify({
              message: "Por favor verifique os dados informados",
              type: Types.OPOSITY1,
            }),
          () => {
            this.router.navigate(["/"]);
          }
        )
      );
  }
  handlelogin(url?: string) {
    this.router.navigate(["/auth/signin", url]);
  }

  getUser(): User {
    return this.user;
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem("User");
    this.router.navigate(["/"]);
  }
}