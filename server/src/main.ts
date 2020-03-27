import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { TransformInterceptor } from './utils/transform.interceptor';
import { getValidationMessage } from './utils/getValidationMessage';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // web漏洞
  app.use(helmet());
  // cors
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe(),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3001);
}
bootstrap();
