import { PessoaEntity } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('recados') // TODO: nome da tabela no banco de dados
export class RecadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  // TODO: Muitos recados tem relação com uma pessoa. Por isso Many to One
  @ManyToOne(() => PessoaEntity)
  @JoinColumn({ name: 'de' }) // especifica a cluna que faz a relação
  de: PessoaEntity;

  // TODO: Muitos recados tem relação com uma pessoa. Por isso Many to One
  @ManyToOne(() => PessoaEntity)
  @JoinColumn({ name: 'para' }) // especifica a cluna que faz a relação
  para: PessoaEntity;

  @Column({ type: 'boolean', default: false })
  lido: boolean;

  @Column({ type: 'date' })
  data: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
