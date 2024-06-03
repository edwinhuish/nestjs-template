import type { Request, Response } from 'express';
import { get } from 'lodash';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { retriveUser } from '@app/lib/util/userFunc';

import { AuthService, RBACService } from '../services';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly rbacService: RBACService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const cookieToken = get(req, 'cookies.token');
    const authorizationToken = get(req, 'headers.authorization');
    const token = cookieToken || authorizationToken;
    if (token) {
      const current_user = await this.authService.getInfoByToken(token);
      if (current_user) {
        retriveUser.setUser(req, current_user);
        const user_roles = this.rbacService.getRolesByUserId(current_user.id);
        const permissions = this.rbacService.getPermissionsByRoles(user_roles);
        const permitted_routes =
          this.rbacService.getRoutesByPermissions(permissions);
        const permitted_actions = 
          this.rbacService.getActionsByPermissions(permissions);
      }
    }
    next();
  }
}
