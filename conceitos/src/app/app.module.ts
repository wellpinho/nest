import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceptsManualModule } from 'src/concepts-manual/concepts-manuel.module';
import { ConceptsAutomaticModule } from 'src/concepts-automatic/concepts-automatic.module';

/*
 ** Todo módulo novo deve ser importado aqui no módulo main!
 ** Para que serve um module no nest?
 ** organizar o código,encapsular coisas
 */

@Module({
  imports: [ConceptsManualModule, ConceptsAutomaticModule],
  controllers: [AppController], // é para controllar requests e responses
  providers: [AppService], // injeção de depedência
  exports: [], // podemos exportar coisas importadas no imports acima
})
export class AppModule {}
