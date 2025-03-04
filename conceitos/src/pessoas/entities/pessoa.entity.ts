import { IsEmail } from 'class-validator';
import { RecadoEntity } from 'src/recados/entities/Recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pessoas')
export class PessoaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  password: string;

  // TODO: Uma pessoa pode ter enviado muitos recados (como: "de").
  // Esses recados são armazenados na tabela de recados.
  @OneToMany(() => RecadoEntity, (recado) => recado.de)
  recadosEnviados: RecadoEntity[];

  // TODO: Uma pessoa pode ter recebido muitos recados (como: "para").
  // Esses recados são armazenados na tabela de recados.
  @OneToMany(() => RecadoEntity, (recado) => recado.para)
  recadosRecebidos: RecadoEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
