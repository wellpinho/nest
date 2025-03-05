import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export class InterceptorHandleDataResponse implements NestInterceptor {
  private readonly cache = new Map<string, any>();

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((response) => {
        if (Array.isArray(response.data)) {
          return { response, count: response.data.length };
        }

        return response;
      }),
    );
  }
}
