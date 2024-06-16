import { RBACService } from './rbac.service';
import { UserService } from './user.service';
import { OpenAIAccountService } from './openai-account.service';
import { AuthService } from './auth.service';

export const BUSINESS_SERVICES = [
  AuthService,
  UserService,
  RBACService,
  OpenAIAccountService,
];
