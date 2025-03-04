import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('recados') // TODO: nome da tabela no banco de dados
export class RecadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  @Column({ type: 'varchar', length: 50 })
  de: string;

  @Column({ type: 'varchar', length: 50 })
  para: string;

  @Column({ type: 'boolean', default: false })
  lido: boolean;

  @Column({ type: 'date' })
  data: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
