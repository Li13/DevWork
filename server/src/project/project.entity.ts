import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Base } from '../utils/baseEntiry';
import { UserDemandRelations } from '../relations/userDemand.entity';

@Entity()
export class Project extends Base {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, comment: '项目名称' })
  name: string;

  // @OneToMany(
  //   () => UserDemandRelations,
  //   userDemand => userDemand.user,
  // )
  // userDemand: UserDemandRelations[];
}
