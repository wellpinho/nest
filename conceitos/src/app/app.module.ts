import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { SimpleMiddleware } from 'src/middlewares/simpleMiddleware';

/*
 ** Todo módulo novo deve ser importado aqui no módulo main!
 ** Para que serve um module no nest?
 ** organizar o código,encapsular coisas
 */

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest',
      autoLoadEntities: true, // TODO: carrega as entidades sem preicsar especifica-las
      synchronize: true, // TODO: sincroniza com o banco local. Não usar em produção!
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController], // é para controllar requests e responses
  providers: [AppService], // injeção de depedência
  exports: [], // podemos exportar coisas importadas no imports acima
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
