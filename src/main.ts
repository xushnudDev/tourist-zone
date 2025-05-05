import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as  morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if(process.env?.NODE_ENV?.trim() === 'development') {
    app.use(morgan('tiny'))

  }
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const port = Number(process.env.APP_PORT) || 3000
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
