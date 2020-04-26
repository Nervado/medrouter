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

  /*
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      
      if (user) {
        this.userState = user;
        localStorage.setItem("user", JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  */

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {
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
            this.defaultRoute = DefaultRoutes[User.user.role[0]]; // setup default route
          },
          () => {
            localStorage.setItem("user", null); // on error clear user from local storage
          },
          () => {
            localStorage.setItem("user", JSON.stringify(this.user));
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
    localStorage.removeItem("user");
    this.router.navigate(["/"]);
  }

  subscribe() {
    this.router.navigate(["/auth/signup"]);
  }

  session() {
    this.router.navigate(["/auth/signin"]);
  }
}
