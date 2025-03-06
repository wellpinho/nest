import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoaEntity } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { BadRequestError, NotFoundError } from 'src/errors';
import { HashingServiceProtocol } from 'src/auth/hashing/hasging.service';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepository: Repository<PessoaEntity>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const { email, password } = createPessoaDto;
    const pessoaExiste = await this.pessoaRepository.findOneBy({ email });

    if (pessoaExiste) return BadRequestError('Pessoa já cadastrada');

    const hashedPassword = await this.hashingService.hash(password);

    const pessoaMapped = {
      ...createPessoaDto,
      password: hashedPassword,
    };
    // TODO: create salva em memória, não no banco de dados
    const pessoa = this.pessoaRepository.create(pessoaMapped);

    // TODO: apenas no save que o dado é salvo no banco de dados
    return await this.pessoaRepository.save(pessoa);
  }

  async findAll(offset: number = 1, limit: number = 10) {
    const [pessoas, total] = await this.pessoaRepository.findAndCount({
      order: { id: 'desc' },
      select: ['id', 'nome', 'email'],
      skip: (offset - 1) * limit,
      take: limit,
    });

    return {
      data: pessoas,
      total,
      offset,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });

    if (!pessoa) return NotFoundError('Pessoa não encontrada');

    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoa = await this.pessoaRepository.preload({
      id,
      ...updatePessoaDto,
    });

    if (!pessoa) return NotFoundError('Pessoa não encontrada');
    return await this.pessoaRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });

    if (!pessoa) return NotFoundError('Pessoa não encontrada');

    return await this.pessoaRepository.remove(pessoa);
  }
}
