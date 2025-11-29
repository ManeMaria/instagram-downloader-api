import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { openApi, validationPipeConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração da validação dos dados
  app.useGlobalPipes(validationPipeConfig);
  openApi(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
