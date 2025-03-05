## No NestJS, pipes são classes usadas para transformar e validar dados. Eles são executados antes que o manipulador de rota processe a solicitação. Pipes podem ser usados para:

#### 1. Transformação: Modificar os dados de entrada para o formato desejado.

- Validação: Verificar se os dados de entrada atendem a certos critérios e lançar exceções se não atenderem.
  Exemplo de Uso:
  Transformação:
  Converte um parâmetro de string para número.

```
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

#### 2. Validação:

- Verifica se os dados de entrada são válidos.

```
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

#### 3. Aplicação de Pipes:

- Globalmente:

```
import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

- Em um controlador ou rota específica:

```
import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe';

@Controller('items')
export class ItemsController {
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `Item #${id}`;
  }
}
```

#### Resumo:

- Transformação: Modifica os dados de entrada.
- Validação: Verifica a conformidade dos dados de entrada.
- Aplicação: Pode ser global ou específica para controladores/rotas.
