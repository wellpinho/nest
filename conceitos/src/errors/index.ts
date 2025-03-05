import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

/*
 ** Função que lança um erro de Recurso não encontrado
 ** @param message Mensagem de erro
 ** @statusCode 404
 */

export const NotFoundError = (message: string) => {
  throw new NotFoundException(message);
};

export const BadRequestError = (message: string) => {
  throw new BadRequestException(message);
};

export const UnauthorizedRequestError = (message: string) => {
  throw new UnauthorizedException(message);
};
