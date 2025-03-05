import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnauthorizedRequestError } from 'src/errors';

@Injectable()
export class InterceptorHandleToken {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return UnauthorizedRequestError('Usuário não esta logado!');
    }

    console.log('Token:', token);

    return next.handle();
  }
}
