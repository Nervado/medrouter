import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { configService } from './config/config.service';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: configService.getOrigin() });
    logger.log(`Accepting requests from origin "${configService.getOrigin()}"`);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.getHttpPort());
  logger.log(`listening on port "${configService.getHttpPort()}"`);
}
bootstrap();
