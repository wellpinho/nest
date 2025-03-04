import { Injectable } from '@nestjs/common';
import { RecadoEntity } from './entities/Recado.entity';
import { NotFoundError } from 'src/errors';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity) // TODO: passa a entidade
    private readonly recadoRepository: Repository<RecadoEntity>,
  ) {}

  async findAll() {
    const recados = await this.recadoRepository.find();

    return recados;
  }

  async create(createRecadoDto: CreateRecadoDto) {
    try {
      const recado = this.recadoRepository.create({
        data: new Date(),
        lido: false,
        ...createRecadoDto,
      });

      return this.recadoRepository.save(recado);
    } catch (error) {
      return error;
    }
  }

  async createMany(createRecadoDtos: CreateRecadoDto[]) {
    createRecadoDtos.map(async (dto) => {
      const recado = this.recadoRepository.create({
        data: new Date(),
        lido: false,
        ...dto,
      });

      await this.recadoRepository.save(recado);
    });

    return 'Recados criados com sucesso!';
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });

    if (!recado) {
      return NotFoundError('Recado não encontrado');
    }

    return recado;
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    };

    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateDto,
    });

    if (!recado) {
      return NotFoundError('Recado não existe!');
    }

    return await this.recadoRepository.save(recado);
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });

    if (!recado) {
      return NotFoundError('O Recado selecionado não existe!');
    }

    return await this.recadoRepository.remove(recado);
  }
}
