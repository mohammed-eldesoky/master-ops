import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MongooseFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Global Filters
  app.useGlobalFilters(new MongooseFilter());
  //Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
