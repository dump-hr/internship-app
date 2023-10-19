import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT || 3003);

  console.log(`Code runner is running on: ${await app.getUrl()}`);
}
bootstrap();
