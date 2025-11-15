import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { openApi } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  openApi(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
