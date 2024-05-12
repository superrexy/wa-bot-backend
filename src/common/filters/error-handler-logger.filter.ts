import { ArgumentsHost, Catch, HttpServer } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { logger } from 'nestjs-i18n';
import { MyLogger } from '../logger/logger.service';

@Catch()
export class ErrorHandlerLoggerFilter extends BaseExceptionFilter {
  constructor(logger: MyLogger, applicationRef: HttpServer) {
    super(applicationRef);
  }

  handleUnknownError(
    exception: unknown,
    host: ArgumentsHost,
    applicationRef:
      | HttpServer<any, any, any>
      | AbstractHttpAdapter<any, any, any>,
  ): void {
    logger.error(exception, { context: ErrorHandlerLoggerFilter.name });
    super.handleUnknownError(exception, host, applicationRef);
  }
}
