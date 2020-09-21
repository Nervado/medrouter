import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { MEDROUTER_API } from "../api/app.api";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class CustomSocket extends Socket {
  constructor(
    // Has got implementation to fetch the token from localstorage
    private authService: AuthService
  ) {
    super({
      url:
        MEDROUTER_API +
        `?wsJwtToken=${
          authService.getAccessToken() ? authService.getAccessToken() : ""
        }`,
      options: {},
    });

    // Set token as part of the query object
    //this.ioSocket.query = {
    // wsJwtToken: (async () =>
    // this.authService.getAccessToken()
    // ? this.authService.getAccessToken()
    //: "")(),
    //};
  }
}
