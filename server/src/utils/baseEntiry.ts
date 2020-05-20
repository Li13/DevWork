import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Base {
  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    comment: '删除标志0 正常 1删除',
  })
  expired: number;
}
