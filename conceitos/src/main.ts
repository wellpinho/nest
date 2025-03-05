import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { PipeParseIntId } from './common/pipes/ParseIntId.pipe';

/*
 ** Finalidade do arquivo main
 ** è usado para criar o app e iniciar a aplicação.
 */
async function startApp() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true /* TODO: whitelist remove dados que não estão no Dto*/,
      forbidNonWhitelisted:
        true /* TODO: forbidNonWhitelisted proibe dados que não estão no Dto*/,
      transform:
        false /* TODO: transform transforma os dados dos params para o tipo correto no Dto*/,
    }),
    new PipeParseIntId(), // TODO: PipeParseIntId é um pipe customizado e esta de forma global agetando todas as rotas que usam ID
  );
  await app.listen(process.env.PORT ?? 4000);
}
startApp();
