import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('websocketStrategy') {
  getRequest<T = any>(context: ExecutionContext): T {
    return context.switchToWs().getClient().handshake;
  }
}
