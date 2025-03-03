import { NotFoundException } from '@nestjs/common';

/*
 ** Função que lança um erro de Recurso não encontrado
 ** @param message Mensagem de erro
 ** @statusCode 404
 */

export const NotFoundError = (message: string) => {
  throw new NotFoundException(message);
};
