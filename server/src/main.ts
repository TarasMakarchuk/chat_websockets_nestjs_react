import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";

const PORT = process.env.PORT || 9005;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => Logger.log(`\x1b[34m Server started on http://${process.env.HOST}:${PORT}`));
}
bootstrap();
