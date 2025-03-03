import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

/*
 ** Finalidade do arquivo main
 ** è usado para criar o app e iniciar a aplicação.
 */
async function startApp() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4000);
}
startApp();
