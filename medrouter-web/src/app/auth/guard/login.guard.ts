import { CanLoad, Route } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { Role } from "../enums/roles-types";

@Injectable()
export class LoginGuard implements CanLoad {
  constructor(private authService: AuthService) {}
  canLoad(route: Route): boolean {
    if (this.authService.isloggedIn()) {
      return true;
    }

    this.authService.handlelogin(`/${route.path}`);
    return false;
  }

  findRole(roles: Array<Role>) {
    return roles.find((role) => role === Role.CLIENT);
  }
}
