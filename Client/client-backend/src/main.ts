import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
    app.enableCors({
      origin: 'http://localhost:5173',   // your Vite frontend
      credentials: true,                 // allow cookies
    });
  
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
