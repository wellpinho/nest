No NestJS, a Entity (ou Entidade) é usada para representar uma tabela no banco de dados no contexto do TypeORM (ou outro ORM). Ela define a estrutura dos dados, os tipos e as relações com outras entidades.

1. Para que serve a Entity?
   A Entity é a camada que define os dados no banco e como eles se relacionam. Com ela, o TypeORM consegue:
   ✅ Criar tabelas automaticamente (migrations)
   ✅ Fazer consultas com Repositories ou QueryBuilder
   ✅ Definir relacionamentos entre tabelas
   ✅ Garantir validações dos dados no banco

2. Como criar uma Entity no NestJS?
   Vamos supor que temos um sistema de usuários. Criamos a entidade User assim:

```
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Indica que esta classe representa uma tabela no banco
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
```

🔹 Isso cria uma tabela user no banco com id, name, email e password.

3. Como usar a Entity no NestJS?
   Depois de definir a entidade, você usa o Repository do TypeORM para manipular os dados no banco.

Exemplo de Service que usa a Entity:

```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ name, email, password });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
```

4. Onde a Entity se encaixa na arquitetura do NestJS?
   Em uma arquitetura limpa (Clean Architecture), a entidade fica na camada de domínio, enquanto os serviços (Services) e controladores (Controllers) lidam com a lógica de aplicação e a interface com o usuário.

🔹 Fluxo resumido:
1️⃣ O Controller recebe a requisição e chama o Service.
2️⃣ O Service usa o Repository do TypeORM para manipular a Entity no banco.
3️⃣ A Entity reflete diretamente os dados armazenados.

5. Resumo
   📌 Entity no NestJS é um modelo de dados do banco, usado pelo TypeORM.
   📌 Permite criar, consultar e manipular os dados de forma organizada.
   📌 Ajuda a manter uma arquitetura modular e escalável.
   📌 Trabalha junto com Repositories e Services para separar responsabilidades.

Por: Wellington Pinho
