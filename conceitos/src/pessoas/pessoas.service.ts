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

    const pessoa = this.pessoaRepository.create(createPessoaDto);

    return await this.pessoaRepository.save(pessoa);
  }
}
