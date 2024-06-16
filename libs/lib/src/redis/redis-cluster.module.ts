import { type DynamicModule } from '@nestjs/common';
import { RedisClientOptions, RedisModule } from '@songkeys/nestjs-redis';
import { RedisService } from './redis.service';

export class RedisClusterModule {
  static forRoot(redisConfig: RedisClientOptions[]): DynamicModule {
    return {
      global: true,
      module: RedisClusterModule,
      imports: [
        RedisModule.forRoot({
          config: redisConfig,
        }),
      ],
      providers: [RedisService], // along with services setting
      exports: [RedisService], // along with services setting
    };
  }
}
