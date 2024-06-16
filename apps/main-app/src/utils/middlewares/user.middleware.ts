import type { Request, Response } from 'express';
import { get } from 'lodash';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { retriveUser } from '@app/lib/util/userFunc';

import { AuthService } from '@app/lib/databases/repo-services/auth.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    // private readonly rbacService: RBACService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const cookieToken = get(req, 'cookies.token');
    const authorizationToken = get(req, 'headers.authorization');
    const token = cookieToken || authorizationToken;
    if (token) {
      const current_user = await this.authService.getUserSessionByToken(token);
      if (current_user) {
        retriveUser.setUser(req, current_user);
      }
    }
    next();
  }
}
