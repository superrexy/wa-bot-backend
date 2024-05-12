import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ALLOW_UNAUTHORIZED_KEY } from '../../common/decorators/allow-unauthorized.decorators';
import { REFRESH_TOKEN } from '../../common/decorators/refresh-token.decorators';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access-token') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    const isAllowUnauthorizedRequest = this.reflector.get<boolean>(
      ALLOW_UNAUTHORIZED_KEY,
      context.getHandler(),
    );

    const isRefreshToken = this.reflector.get<boolean>(
      REFRESH_TOKEN,
      context.getHandler(),
    );

    if (isRefreshToken) {
      if (err || !user) return null;
    }

    if (isAllowUnauthorizedRequest) {
      if (context.switchToHttp().getRequest().headers.authorization) {
        return super.handleRequest(err, user, info, context, status);
      }

      if (err || !user) return null;
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
