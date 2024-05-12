import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { Observable, map } from 'rxjs';
import { API_MESSAGE_METADATA } from '../decorators/api-message.decorators';
import ResponseHelpers from '../helpers/response.helpers';
import { ResponseInterface } from '../interfaces/jwt-payload.interfaces';

@Injectable()
export class ResponseWrapperInterceptor<T>
  implements NestInterceptor<T, ResponseInterface<T>>
{
  constructor(
    private readonly reflector: Reflector,
    private readonly i18n: I18nService,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseInterface<T>> {
    const message = this.reflector.get<string>(
      API_MESSAGE_METADATA,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => {
        return ResponseHelpers.successResponse({
          data,
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: message
            ? this.i18n.t(message)
            : this.i18n.t('message.SUCCESS'),
        });
      }),
    );
  }
}
