import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AlowGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allow = this.reflector.get<string[]>('allow', context.getHandler());
    const user = context.switchToHttp().getRequest().user;

    if (!allow) {
      return true;
    }

    if (!this.matchRoles(allow, user.role)) {
      console.log(allow, user.role);
      throw new UnauthorizedException('Not authorized by AllowGuard!');
    }

    return true;
  }

  matchRoles(roles: string[], userRoles: string[]) {
    return userRoles.some(role => !!roles.find(item => item === role));
  }
}
