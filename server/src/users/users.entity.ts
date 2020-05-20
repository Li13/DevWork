import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  Length,
} from 'class-validator';
import { UserDemandRelations } from '../relations/userDemand.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 10, comment: '用户名' })
  username: string;

  @IsNotEmpty()
  @Length(32, 32)
  @Column({ type: 'varchar', length: 32, select: false, comment: '密码' })
  password: string;

  @IsOptional()
  @IsEmail()
  @Column({ type: 'varchar', nullable: true, length: 60, comment: '邮箱' })
  email: string;

  @IsOptional()
  @IsPhoneNumber('CH')
  @Column({ type: 'varchar', nullable: true, length: 11, comment: '手机号' })
  mobile: string;

  @OneToMany(
    () => UserDemandRelations,
    userDemand => userDemand.demand,
  )
  userDemand: UserDemandRelations[];
}
