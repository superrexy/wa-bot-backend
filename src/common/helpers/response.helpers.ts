import { ResponseInterface } from '../interfaces/jwt-payload.interfaces';

export default class ResponseHelpers {
  static successResponse<T>({
    data,
    message = 'Success',
    statusCode = 200,
  }: {
    data: T;
    message?: string;
    statusCode?: number;
  }): ResponseInterface<T> {
    return {
      status: statusCode,
      message,
      data,
    };
  }
}
