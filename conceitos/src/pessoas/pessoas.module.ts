import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from './entities/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity])],
  controllers: [PessoasController],
  providers: [PessoasService], // para uso interno
  exports: [PessoasService], // para uso externo
})
export class PessoasModule {}
