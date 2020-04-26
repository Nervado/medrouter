import {
  CanLoad,
  CanActivate,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { Role } from "../enums/roles-types";

@Injectable()
export class ClientGuard implements CanLoad {
  constructor(private authService: AuthService) {}
  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean {
    return this.checkAuthentication(activatedRoute.routeConfig.path);
  }

  checkAuthentication(path: string): boolean {
    const roles = this.authService.user ? this.authService.user.user.role : "";
    if (roles && this.findRole(roles)) {
      return true;
    }
    this.authService.handlelogin(`${path}`);
    return false;
  }

  findRole(roles: Array<Role>) {
    return roles.find((role) => role === Role.CLIENT);
  }
}
