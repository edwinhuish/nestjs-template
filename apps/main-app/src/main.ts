/* eslint-disable @typescript-eslint/no-explicit-any */

// import { ip, ipv6 } from 'address';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';
import {
  ExpressAdapter,
  type NestExpressApplication,
} from '@nestjs/platform-express';

import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './main-app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    MainAppModule,
    new ExpressAdapter(),
    {
      cors: true,
    },
  );

  app.set('trust proxy', 1);

  app.enableCors({
    origin: ['http://localhost:4001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(helmet({}));
  app.useLogger(app.get(Logger));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableCircularCheck: true,
        enableImplicitConversion: true,
      },
    }),
  );

  // app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters();

  app.listen(3000);
}
bootstrap();
