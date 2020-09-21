import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetWsUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToWs().getClient().handshake;
    return request.user;
  },
);
