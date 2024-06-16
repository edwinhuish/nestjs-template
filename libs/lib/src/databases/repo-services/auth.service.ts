import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../repositories';
import { RedisService } from '@app/lib/redis/redis.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepo: UsersRepository,
    private readonly redisService: RedisService,
  ) {}

  async getUserSessionByToken(user_session_token: string) {
    const user = await this.redisService.getSession(user_session_token);
    if (!user) {
      return null;
    }
    return user;
  }
}
