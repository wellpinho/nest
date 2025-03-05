import { Module, forwardRef } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/Recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RegexProtocol } from 'src/regex/regex.protocol';
import { RemoveSpacesRegex } from 'src/regex/removeSpaces';
import { ConvertToLowerCaseRegex } from 'src/regex/convertToLowerCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecadoEntity]),
    // importa modulos com forwardRef evita que fique no loop caso
    // PessoasModule também esteja importando RecadosModule
    forwardRef(() => PessoasModule),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RegexProtocol,
      useClass: 1 === 1 ? RemoveSpacesRegex : ConvertToLowerCaseRegex,
    },
  ],
})
export class RecadosModule {}
