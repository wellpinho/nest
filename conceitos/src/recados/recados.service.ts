import { Injectable } from '@nestjs/common';
import { RecadoEntity } from './entities/Recado.entity';
import { NotFoundError } from 'src/errors';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: RecadoEntity[] = [];

  findAll() {
    return this.recados;
  }

  create(createRecadoDto: CreateRecadoDto) {
    this.lastId++;

    this.recados.push({
      id: this.lastId,
      data: new Date(),
      lido: false,
      ...createRecadoDto,
    });

    return createRecadoDto;
  }

  createMany(createRecadoDtos: CreateRecadoDto[]) {
    createRecadoDtos.map((dto) =>
      this.recados.push({
        id: this.lastId++,
        data: new Date(),
        lido: false,
        ...dto,
      }),
    );

    return this.recados;
  }

  findOne(id: string) {
    const recado = this.recados.find((recado) => recado.id === Number(id));

    if (!recado) {
      return NotFoundError('Recado não encontrado');
    }

    return recado;
  }

  update(id: string, updateRecadoDto: UpdateRecadoDto) {
    console.log(id);
    const recadoExistente = this.recados.find((item) => item.id === Number(id));

    if (!recadoExistente) {
      return NotFoundError('Recado não existe!');
    }

    if (recadoExistente) {
      Object.assign(recadoExistente, updateRecadoDto);
    }

    return recadoExistente;
  }

  remove(id: string) {
    const recadoExistenteIndex = this.recados.findIndex(
      (item) => item.id === Number(id),
    );

    if (recadoExistenteIndex === -1) {
      return NotFoundError('O Recado selecionado não existe!');
    }

    this.recados.splice(recadoExistenteIndex, 1);

    return this.recados;
  }
}
