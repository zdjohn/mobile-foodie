import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('app starts at: http://localhost:3000/graphql');
  await app.listen(3000);
}
bootstrap();
