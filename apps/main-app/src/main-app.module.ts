import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';
import { LoggerModule } from 'nestjs-pino';
import { ThrottlerModule } from '@nestjs/throttler';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/lib/databases/databases.module';
import appConfig from './utils/config/configurations';
import { RedisClusterModule } from '@app/lib/redis/redis-cluster.module';
import redisContant from '@app/lib/redis/redis.contant';
// import { randomUUID } from 'crypto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        // genReqId: () => randomUUID(), // this is a quick and easy way to add the request id
        // if want to debugg just comment the next 2 line out
        // quietReqLogger: true,
        // autoLogging: false,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    }),
    ThrottlerModule.forRoot([
      // IMPORTANT! You should use the ThrottlerModule.forRoot() in the root module to make sure the ThrottlerService is a singleton.
      // IMPORTANT! all the options will take effect in the same order as they are defined here globally.
      // IMPORTANT! the name of the options is not important, you can use any name, but the order is important. they will be executed in the same order as they are defined here.
      {
        // 10 calls per second
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        // 20 calls per 10 seconds
        name: 'medium',
        ttl: 10000,
        limit: 50,
      },
      {
        // 150 calls per 60 seconds
        name: 'long',
        ttl: 60000,
        limit: 150,
      },
    ]),
    HttpModule,
    CacheModule.register({
      ttl: 5,
      max: 10000,
      isGlobal: true,
    }),
    DatabaseModule.forRoot({
      type: 'mysql',
      host: appConfig().DATABASES.DATABASE_MAIN_HOST,
      port: appConfig().DATABASES.DATABASE_MAIN_PORT,
      username: appConfig().DATABASES.DATABASE_MAIN_USERNAME,
      password: appConfig().DATABASES.DATABASE_MAIN_PASSWORD,
      database: appConfig().DATABASES.DATABASE_MAIN_DATABASE,
      synchronize: appConfig().NODE_ENV === 'development' ? true : false,
    }),
    RedisClusterModule.forRoot([
      {
        namespace: redisContant().REDIS_CACHE,
        host: appConfig().REDIS_CLUSTER.REDIS1_HOST,
        port: appConfig().REDIS_CLUSTER.REDIS1_PORT,
        password: appConfig().REDIS_CLUSTER.REDIS1_PASSWORD,
        db: appConfig().REDIS_CLUSTER.REDIS1_DB,
      },
      {
        namespace: redisContant().REDIS_USER_SESSION,
        host: appConfig().REDIS_CLUSTER.REDIS2_HOST,
        port: appConfig().REDIS_CLUSTER.REDIS2_PORT,
        password: appConfig().REDIS_CLUSTER.REDIS2_PASSWORD,
        db: appConfig().REDIS_CLUSTER.REDIS2_DB,
      },
    ]),
  ],
})
export class MainAppModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

// {
//                 namespace: appConfig().REDIS1_NAMESPACE,
//                 host: appConfig().REDIS1_HOST,
//                 port: appConfig().REDIS1_PORT,
//                 password: appConfig().REDIS1_PASSWORD,
//                 db: appConfig().REDIS1_DB,
// }
