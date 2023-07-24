import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class-validation을 사용하기 위해서 등록해줘야함(global로 사용)
  app.useGlobalFilters(new HttpExceptionFilter()); // exception을 전역으로 사용하기 위해서 등록해야함

  const config = new DocumentBuilder() // OpenAPI swagger
    .setTitle('Cats nest example')
    .setDescription('The cats API description!!')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS 허용
  app.enableCors({
    origin: true, // 개발할때만 ture, 배포 후에는 특정 url을 써줘야함
    credentials: true,
  });

  const PORT = process.env.PORT; // port 관련해서 환경변수 지정하여 설정
  await app.listen(PORT);
}

bootstrap();
