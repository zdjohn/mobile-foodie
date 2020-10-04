import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log('app starts at: http://localhost:3000/graphql');
  // allow Ctrl+C exit
  app.enableShutdownHooks();
  // add compression
  app.use(compression());
  // add security
  process.env.NODE_ENV === 'production' && app.use(helmet());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
