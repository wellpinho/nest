import { CallHandler, ExecutionContext } from '@nestjs/common';
import { tap } from 'rxjs';

export class InterceptorTimeConection {
  async intercept(
    context: ExecutionContext, // TODO: aqui tem o contexto da requisição
    next: CallHandler<any>,
  ) {
    return next.handle().pipe(
      tap((data) => {
        // Tap usado para logar informações
        console.log('Tempo de conexão', data);
      }),
    ); // TODO: aqui o interceptor não faz nada.
  }
}
