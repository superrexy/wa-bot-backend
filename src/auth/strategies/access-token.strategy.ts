import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { PrismaService } from 'nestjs-prisma';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interfaces';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const accessToken = await this.prisma.accessToken.findFirst({
      where: {
        session_id: payload.sub,
        status_token: true,
      },
    });

    if (!accessToken) {
      throw new UnauthorizedException('TOKEN_IS_NOT_VALID');
    }

    if (accessToken.user_agent !== req.headers['user-agent']) {
      throw new UnauthorizedException('TOKEN_FROM_OTHER_DEVICES');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: accessToken.user_id,
      },
    });

    return {
      ...payload,
      ...user,
    };
  }
}
