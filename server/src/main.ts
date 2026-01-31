import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupCors } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupCors(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
