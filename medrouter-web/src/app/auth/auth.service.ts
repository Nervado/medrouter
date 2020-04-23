import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { MEDROUTER_API } from "../app.api";
import { NotificationService } from "../shared/messages/notification.service";
import { User } from "./models/user.model";
import { Login } from "./models/login.model";
import { SignUp } from "./models/signup.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: User;

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
            this.notificationService.notify(
              `Bem vindo ${this.user.user.username} !`
            );
          },
          () => {
            this.notificationService.notify("Verifique seus dados");
          },
          () => {
            this.router.navigate(["/clients"]);
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
            this.notificationService.notify(
              "Cadastro realizado com sucesso, verifique seu email!"
            ),
          () =>
            this.notificationService.notify(
              "Por favor verifique os dados informados"
            )
        )
      );
  }
}
