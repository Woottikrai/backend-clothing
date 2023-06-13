import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(urlencoded({ extended: true, limit: '50mb' })); //solution to add image
  app.use(json({ limit: '50mb' })); //solution to add image
  const config = new DocumentBuilder()
    .setTitle('Clothing-Shop')
    .setDescription('This is API Clothing-Shop')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .addTag('Clothing-Shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(8080);
  console.log('Start at ::', await app.getUrl());
}
bootstrap();
