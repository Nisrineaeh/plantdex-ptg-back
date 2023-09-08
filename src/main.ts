import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import* as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  
  
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  }

  const config = new DocumentBuilder()
    .setTitle('Plantdex de Nisrine')
    .setDescription('The plantdex API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());
  
  // Configuration d'un chemin pour servir les fichiers statiques (images) depuis le répertoire "uploads"
  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads'))); // Utilisation de join pour obtenir le chemin absolu du répertoire "uploads"

  app.use('/uploads', express.static('uploads'))
  await app.listen(3000);

}
bootstrap();
