import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/Recado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecadoEntity])],
  controllers: [RecadosController],
  providers: [RecadosService],
})
export class RecadosModule {}
