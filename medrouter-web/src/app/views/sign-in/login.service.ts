import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { MEDROUTER_API } from "../../app.api";
import { NotificationService } from "../../shared/messages/notification.service";
import { User } from "./models/user.model";
import { Login } from "./models/login.model";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private user: User;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
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
              `Bem vindo seu filho da puta${
                this.user.user.username
              } agora:${new Date()}`
            );
          },
          () => {
            this.notificationService.notify("Verifique seus dados");
          }
        )
      );
  }
}
