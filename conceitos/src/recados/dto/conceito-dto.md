📌 O que é um DTO? (Data Transfer Object)
Um DTO (Data Transfer Object) é um objeto usado para transportar dados entre camadas da aplicação, sem expor a estrutura interna da entidade do banco de dados. Ele ajuda a manter o código mais seguro, organizado e eficiente.

📌 Por que usar DTOs?
✅ Evita expor diretamente as Entities
✅ Melhora a segurança (esconde dados sensíveis, como senhas)
✅ Facilita a validação de dados recebidos na API
✅ Reduz o tráfego de dados (enviando apenas o necessário)

🚀 Exemplo de DTO no NestJS
No NestJS, normalmente usamos classes para definir DTOs e aplicamos validações com class-validator.

1️⃣ Criando um DTO para Criar Usuário (create-user.dto.ts)

```
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
```

📌 Valida se name não está vazio, email tem formato correto e password tem no mínimo 6 caracteres.

2️⃣ Usando o DTO no Controller

```
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
```

📌 O DTO garante que apenas os dados esperados sejam recebidos na requisição.

📌 Resumo
✔ DTO é um objeto que transporta dados entre camadas
✔ Ajuda a validar e filtrar dados da API
✔ Evita expor diretamente a estrutura do banco de dados
✔ Usado no NestJS com class-validator para validação automática

Se precisar de mais detalhes ou exemplos, só avisar! 🚀
