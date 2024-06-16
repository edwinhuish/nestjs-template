import type {
  Request,
  // Response
} from 'express';
import { get } from 'lodash';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { RBACService } from '@app/lib/databases/repo-services/rbac.service';

@Injectable()
export class RoleGlobalGuard implements CanActivate {
  constructor(private readonly rbacService: RBACService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    // const res = context.switchToHttp().getResponse<Response>();
    const current_user = get(req, 'user');
    const route = get(req, 'route.path');

    const permissions = await this.rbacService.getUserAccess(current_user.id);
    return permissions.api.includes(route) ? true : false;
  }
}
