import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { configService } from './config/config.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClientService } from './client/client.service';
import { ClientModule } from './client/client.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const options = new DocumentBuilder()
    .setTitle('MedRouter')
    .setDescription('MedRouter API description')
    .setVersion('1.0.1')
    .addTag('medrouter')
    .build();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'src', 'emails', 'views'));
  app.setViewEngine('pug');

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: configService.getOrigin() });
    logger.log(`Accepting requests from origin "${configService.getOrigin()}"`);
  }

  logger.log('Runing in: ' + process.env.NODE_ENV + ' mode');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.getHttpPort());
  logger.log(`listening on port "${configService.getHttpPort()}"`);
}
bootstrap();
