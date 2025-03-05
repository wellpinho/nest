import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateRecadoDto {
  @IsString({
    message: 'O texto deve ser uma string',
  })
  @IsNotEmpty({ message: 'O texto é obrigatório' })
  readonly texto: string;

  @IsPositive()
  @IsNotEmpty({ message: 'O campo "deId" é obrigatório' })
  deId: number;

  @IsPositive()
  @IsNotEmpty({ message: 'O campo "paraId" é obrigatório' })
  paraId: number;

  // @IsString({
  //   message: 'O campo "de" deve ser uma string',
  // })
  // @IsNotEmpty({ message: 'O campo "de" é obrigatório' })
  // readonly de: string;

  // @IsString({
  //   message: 'O campo "para" deve ser uma string',
  // })
  // @IsNotEmpty({ message: 'O campo "para" é obrigatório' })
  // readonly para: string;
}
