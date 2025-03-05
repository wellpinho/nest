import { CallHandler, ExecutionContext } from '@nestjs/common';
import { catchError, throwError } from 'rxjs';
import { BadRequestError } from 'src/errors';
import { uniqueGenerate } from 'src/shared/utils/uuidGenerator';

export class InterceptorHandleError {
  async intercept(
    context: ExecutionContext, // TODO: aqui tem o contexto da requisição
    next: CallHandler<any>,
  ) {
    return next.handle().pipe(
      catchError((error) => {
        console.log('error', error);
        const unique = uniqueGenerate(); // Gera um UUID único
        return throwError(() => {
          if (error.name === 'ExceptionsHandler') {
            console.log('unique', unique, error);
            return BadRequestError(
              `Erro interno. Contate o suporte informando o código: ${unique}`,
            );
          }

          return error;
        });
      }),
    );
  }
}
