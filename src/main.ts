import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import config from './common/services/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const documentOptions = new DocumentBuilder()
    .setTitle('Wine Cellar API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('/api', app, document);

  const server = await app.listen(config.PORT);
  server.setTimeout(180000);
}
bootstrap();
