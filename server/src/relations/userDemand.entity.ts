import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../users/users.entity';
import { Demand } from '../demand/demand.entity';

type RelationsType = 1 | 2;

@Entity()
export class UserDemandRelations {
  @ManyToOne(
    () => User,
    user => user.userDemand,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => Demand,
    demand => demand.userDemand,
    { primary: true },
  )
  @JoinColumn({ name: 'demand_id' })
  demand: Demand;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
    comment: '连接类型 1创建人 2分配者',
  })
  type: RelationsType;
}
