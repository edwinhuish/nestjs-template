import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';
import REDIS_CONSTANCT from '@app/lib/redis/redis.contant';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(
    @InjectRedis(REDIS_CONSTANCT().REDIS_USER_SESSION)
    private redisSessionService: Redis,
    @InjectRedis(REDIS_CONSTANCT().REDIS_CACHE)
    private redisCacheService: Redis,
  ) {
    this.logger.warn('RedisService initialized');
  }

  //--------------------------------------------------- Redis Service getter
  getRedisSessionService(): Redis {
    return this.redisSessionService;
  }

  getRedisCacheService(): Redis {
    return this.redisCacheService;
  }

  //--------------------------------------------------- Redis Session Service
  // expire 单位是秒 这里会期待从外部传入的expire，而在main-app中 其实是有一个env配置专门用来设置session的过期时间
  setSession(
    token: string,
    user_session: string,
    expire: number,
  ): Promise<string> {
    return this.redisSessionService.set(token, user_session, 'EX', expire);
  }

  async getSession(token: string): Promise<object | null> {
    return this.redisSessionService.get(token).then((res) => {
      return res ? JSON.parse(res) : null;
    });
  }

  async delSession(token: string): Promise<number> {
    return await this.redisSessionService.del(token);
  }

  //--------------------------------------------------- Redis Cache Service
  async setCaches(
    payload: Array<{ key: string; value: unknown; expire: number }>,
  ) {
    // 理解成Mysql的事务吧 一次性写入多个key-value
    const pipeline = this.redisCacheService.pipeline();
    payload.forEach((item) => {
      pipeline.set(item.key, JSON.stringify(item.value), 'EX', item.expire);
    });
    await pipeline.exec();
  }

  async getCaches(keys: string[]): Promise<unknown[]> {
    const result = await this.redisCacheService.mget(keys);
    return result.map((item) => JSON.parse(item));
  }

  async delCaches(keys: string[]): Promise<number> {
    return await this.redisCacheService.del(...keys);
  }
}
