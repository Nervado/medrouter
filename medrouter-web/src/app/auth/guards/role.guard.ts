import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";
import { ClientGuard } from "./client.guard";
import { Role } from "../enums/roles-types";

@Injectable()
export class RoleGuard extends ClientGuard {
  constructor(authService: AuthService) {
    super(authService);
    this.findRole = (roles: Array<Role>) => {
      const search = roles.find((role) =>
        this.roles.find((routeRole) => routeRole === role)
      );
      return search;
    };
  }
}
