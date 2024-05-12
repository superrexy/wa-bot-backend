export interface JwtPayload {
  sub: string;
}

export interface ResponseInterface<T> {
  status: number;
  message: string;
  data: T;
}
