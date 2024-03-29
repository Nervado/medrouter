import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

import {
  MEDROUTER_API,
  MEDICINES_API,
  MEDICINES_API_USER,
  MEDICINES_API_PASS,
} from "../../api/app.api";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  private token = "";

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.authService.isloggedIn()) {
      this.token = "";
      return next.handle(req);
    }

    this.token = this.authService.user.token;

    if (!req.headers.has("Content-Type")) {
      if (req.url.match(MEDICINES_API)) {
        req = req.clone({
          headers: req.headers.set(
            this.AUTH_HEADER,
            "Basic " + btoa(`${MEDICINES_API_USER}:${MEDICINES_API_PASS}`)
          ),
        });
      } else {
        req = req.clone({
          headers: req.headers.set("Accept", "application/json"),
        });
      }
    }

    req = this.addAuthenticationToken(req);

    return next.handle(req);
  }

  wsintercept(req: WebSocket) {}

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    if (!this.token) {
      return request;
    }

    if (!request.url.match(MEDROUTER_API)) {
      return request;
    }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token),
    });
  }
}
