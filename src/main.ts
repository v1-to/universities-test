import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  mongoose.set('debug', true);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Bis2Bis Test - Universities CRUD')
    .setDescription('Universities API Documentation')
    .setVersion('1.0')
    .addTag('universities')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
