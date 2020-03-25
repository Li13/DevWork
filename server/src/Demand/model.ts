import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Demand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  desc: string;

  @Column('int')
  weight: number;
}
