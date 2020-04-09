import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const user = context.switchToHttp().getRequest().user;

    if (!roles) {
      return true;
    }

    if (!this.matchRoles(roles, user)) {
      throw new UnauthorizedException('Not authorized by RolesGuard!');
    }

    return true;
  }

  matchRoles(roles: string[], userRoles: { [key: string]: boolean }): boolean {
    return roles.reduce((p, c) => p && userRoles[c] === true, true);
  }
}
