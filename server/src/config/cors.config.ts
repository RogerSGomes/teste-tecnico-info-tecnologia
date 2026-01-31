import { INestApplication } from '@nestjs/common';

export function setupCors(app: INestApplication) {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';

  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: frontendUrl,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Accept'],
  });
}
