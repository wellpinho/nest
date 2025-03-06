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
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AuthModule } from 'src/auth/auth.module';

/*
 ** Todo módulo novo deve ser importado aqui no módulo main!
 ** Para que serve um module no nest?
 ** organizar o código,encapsular coisas
 */

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        DB_TYPE: Joi.required(),
        DB_HOST: Joi.required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.required(),
        DB_PASSWORD: Joi.required(),
        DB_DATABASE: Joi.required(),
        DB_AUTOLOADENTITIES: Joi.number().min(0).max(1).default(0),
        DB_SYNCHRONIZE: Joi.number().min(0).max(1).default(0),
      }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: Boolean(process.env.DB_AUTOLOADENTITIES), // TODO: carrega as entidades sem preicsar especifica-las
      synchronize: Boolean(process.env.DB_SYNCHRONIZE), // TODO: sincroniza com o banco local. Não usar em produção!
    }),
    RecadosModule,
    PessoasModule,
    AuthModule,
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
