import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoaEntity } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { BadRequestError } from 'src/errors';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepository: Repository<PessoaEntity>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const { email } = createPessoaDto;
    const pessoaExiste = await this.pessoaRepository.findOneBy({ email });

    if (pessoaExiste) return BadRequestError('Pessoa já cadastrada');

    // TODO: create salva em memória, não no banco de dados
    const pessoa = this.pessoaRepository.create(createPessoaDto);

    // TODO: apenas no save que o dado é salvo no banco de dados
    return await this.pessoaRepository.save(pessoa);
  }

  async findAll() {
    return await this.pessoaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
