import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Base } from '../utils/baseEntiry';
import { UserDemandRelations } from '../relations/userDemand.entity';

type Priority = 1 | 2 | 3 | 4;
type State = 1 | 2 | 3 | 4;
type DemandType = 1 | 2;

@Entity()
export class Demand extends Base {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 128, comment: '标题' })
  title: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 3000, comment: '内容' })
  desc: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
    comment: '需求类型 1小需求 2大版本',
  })
  type: DemandType;

  @Column({
    type: 'tinyint',
    default: 1,
    width: 1,
    comment: '状态 1未分配 2处理中 3已完成 4已取消',
  })
  state: State;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
    comment: '优先级 1一般 2高 3紧急',
  })
  priority: Priority;

  @OneToMany(
    () => UserDemandRelations,
    userDemand => userDemand.user,
  )
  userDemand: UserDemandRelations[];
}

export class QueryListOptions {
  priority?: Priority;
  state?: State;
  demandType?: DemandType;
  page: number;
  pageSize: number;
}

export interface QueryListResults {
  list: Demand[];
  pageCount: number;
  total: number;
  page: number;
}
