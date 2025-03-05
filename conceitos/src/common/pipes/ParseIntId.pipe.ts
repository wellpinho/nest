import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BadRequestError } from 'src/errors';

@Injectable()
export class PipeParseIntId implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parsedValue = Number(value);

    if (isNaN(parsedValue) || parsedValue < 0) {
      return BadRequestError('ID deve ser um número inteiro e maior que 0');
    }

    return parsedValue;
  }
}
