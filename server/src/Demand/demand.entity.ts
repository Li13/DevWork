import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Demand {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 128, comment: '标题' })
  title: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 3000, comment: '内容' })
  desc: string;

  @Column({ type: 'int', comment: '权重' })
  weight: number;
}
