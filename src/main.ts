import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonLoggerService } from './logging/logger.service';
import Configs from './config/configuration';
import './cache/redis.index'; // initialize cache
import { setupDocument } from './config/document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new WinstonLoggerService());
  setupDocument(app, '/api');
  await app.listen(Configs().PORT);
}
bootstrap();
