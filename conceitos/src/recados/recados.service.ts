import { Injectable } from '@nestjs/common';
import { RecadoEntity } from './entities/Recado.entity';
import { NotFoundError } from 'src/errors';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity) // TODO: passa a entidade
    private readonly recadoRepository: Repository<RecadoEntity>,
    private readonly pessoasService: PessoasService,
  ) {}

  async findAll() {
    const recados = await this.recadoRepository.find();

    return recados;
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;

    // Encontrar a pessoa que esta criando o recado
    const de = await this.pessoasService.findOne(deId);

    // Econtrar a pessoa que irá receber o recado
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: { id: recado.de.nome },
      para: { id: recado.para.nome },
    };
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
