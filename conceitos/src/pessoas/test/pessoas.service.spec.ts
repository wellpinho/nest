import { Repository } from 'typeorm';
import { PessoasService } from '../pessoas.service';
import { PessoaEntity } from '../entities/pessoa.entity';
import { HashingServiceProtocol } from 'src/auth/hashing/hasging.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PessoasService', () => {
  let service: PessoasService;
  let pessoaRepository: Repository<PessoaEntity>;
  let hashingService: HashingServiceProtocol;

  // TODO: talvez daria para criar um util de config para cada module???
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoasService,
        {
          provide: getRepositoryToken(PessoaEntity),
          useValue: {},
        },
        {
          provide: HashingServiceProtocol,
          useValue: {},
        },
      ],
    }).compile();
  });

  it('should receive 1+1 = 2', () => {
    expect(1 + 1).toBe(2);
  });
});
