import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePessoaDto {
  @IsString({ message: 'Nome inválido' })
  @IsNotEmpty()
  @MinLength(4, { message: 'Nome deve ter pelo menos 4 caracteres' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Senha deve ter pelo menos tamnho 4' })
  password: string;
}
