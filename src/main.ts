import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const appPort: number = configService.get<number>('PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('File Upload API')
    .setDescription('The File upload API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(appPort);
  console.log('test');

  console.log(`\n\t🚀 Service API ready at http://localhost:${appPort}/ \n\t`);
  console.log(
    `\n\t🚀 Service Swagger ready at http://localhost:${appPort}/api/ \n\t`,
  );
}
bootstrap();
