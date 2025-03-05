import { Module, forwardRef } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from './entities/pessoa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PessoaEntity]),
    // importa modulos com forwardRef evita que fique no loop caso
    // RecadosModule também esteja importando PessoasModule
    forwardRef(() => PessoasModule),
  ],
  controllers: [PessoasController],
  providers: [PessoasService], // para uso interno
  exports: [PessoasService], // para uso externo
})
export class PessoasModule {}
