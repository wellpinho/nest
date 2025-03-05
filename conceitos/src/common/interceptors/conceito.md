### No NestJS, interceptors são classes que implementam a interface NestInterceptor e são usados para interceptar e modificar as requisições e respostas. Eles são úteis para uma variedade de tarefas, incluindo:

1. Transformação de Respostas: Modificar a resposta antes de enviá-la ao cliente.
2. Manipulação de Erros: Capturar e tratar erros de forma centralizada.
3. Logging: Registrar informações sobre a requisição e resposta.
4. Autenticação/Autorização: Verificar e validar tokens ou permissões.
5. Caching: Implementar mecanismos de cache para melhorar a performance.

#### Estrutura Básica de um Interceptor:

- Um interceptor implementa a interface NestInterceptor e deve definir o método intercept, que recebe dois parâmetros: context e next.

```
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({ data }))
    );
  }
}
```

#### Aplicação de Interceptors:

- Globalmente:

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
```

- Em um controlador ou rota específica:

```
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

@Controller('items')
@UseInterceptors(TransformInterceptor)
export class ItemsController {
  @Get()
  findAll() {
    return [{ id: 1, name: 'Item 1' }];
  }
}
```

#### Exemplo de Interceptor de Logging:

```
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`))
      );
  }
}
```

#### Resumo:

- Transformação de Respostas: Modificar a resposta antes de enviá-la ao cliente.
- Manipulação de Erros: Capturar e tratar erros de forma centralizada.
- Logging: Registrar informações sobre a requisição e resposta.
- Autenticação/Autorização: Verificar e validar tokens ou permissões.
- Caching: Implementar mecanismos de cache para melhorar a performance.

Interceptors são uma poderosa ferramenta no NestJS para manipular o fluxo de requisições e respostas de forma centralizada e reutilizável.
