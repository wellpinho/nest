import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class InterceptorAddHeader {
  intercept(
    context: ExecutionContext, // TODO: aqui tem o contexto da requisição
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // ADD cabeçalho no response
    const response = context.switchToHttp().getResponse();

    response.setHeader('X-Custom-Header', 'o valor customizado do cabeçalho');
    return next.handle(); // TODO: aqui o interceptor não faz nada.
  }
}
