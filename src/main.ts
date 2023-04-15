import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { JtwAuthGuard } from './guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JtwAuthGuard(reflector));
  await app.listen(port || 3002);
}
bootstrap();
