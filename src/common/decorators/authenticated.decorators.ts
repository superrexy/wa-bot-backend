import { UseGuards, applyDecorators } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';

export function Authenticated() {
  return applyDecorators(
    UseGuards(new AccessTokenGuard(new Reflector())),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
