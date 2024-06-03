import type { Request, Response } from 'express';
import { get } from 'lodash';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { RBACService } from '../services';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGlobalGuard implements CanActivate {
  constructor(private readonly rbacService: RBACService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    // const res = context.switchToHttp().getResponse<Response>();
    const current_user = get(req, 'user');
    const route = get(req, 'route.path');

    const user_roles = this.rbacService.getRolesByUserId(current_user.id);
    const permissions = this.rbacService.getPermissionsByRoles(user_roles);
    const route_permissions =
      this.rbacService.getRoutesByPermissions(permissions);

    return true;
  }
}
