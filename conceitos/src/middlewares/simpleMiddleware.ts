// TODO: middleware será o primeiro a ser acionado em uma rota e tem acesso ao(request e response)

import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// client => middleware => (Guards, Interceptors, Pipes, filters) => Controller => Service
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('chamou SimpleMiddleware');

    res.setHeader('CABECALHO', 'cabeçalho do middleware');

    // return res.status(404).send({ message: 'Não encontrado' });
    next();
  }
}
