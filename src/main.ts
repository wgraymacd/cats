import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   app.useGlobalFilters(new HttpExceptionFilter()); to use filter globally, for every controller and every route handler
  await app.listen(3000);
}
bootstrap();
