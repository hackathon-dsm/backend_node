import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import morgan from 'morgan';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan('dev'));
  await app.listen(PORT);
  console.log(PORT + "번 포트에서 대기 중");
}

bootstrap();
