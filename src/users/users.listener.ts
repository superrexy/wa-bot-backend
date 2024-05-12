import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UsersListener {
  static passwordHashed(): Prisma.Middleware {
    return async (params, next) => {
      if (params.model === 'User') {
        if (params.action === 'create' || params.action === 'update') {
          if (params.args.data.password) {
            params.args.data.password = await hash(
              params.args.data.password,
              10,
            );
          }
        }
      }
      return next(params);
    };
  }
}
