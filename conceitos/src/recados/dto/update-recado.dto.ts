import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDto } from './create-recado.dto';
import { IsOptional } from 'class-validator';

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  @IsOptional()
  texto: string;

  @IsOptional()
  de: string;

  @IsOptional()
  para: string;
}
