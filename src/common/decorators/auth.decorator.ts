import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './rols.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';


export const Auth = (roles: string[]) => {
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
};