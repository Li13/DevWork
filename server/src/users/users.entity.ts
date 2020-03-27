import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 10, comment: '用户名' })
  username: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 16, comment: '密码' })
  password: string;

  @IsOptional()
  @IsEmail()
  @Column({ type: 'varchar', nullable: true, length: 60, comment: '邮箱' })
  email: string;

  @IsOptional()
  @IsPhoneNumber('CH')
  @Column({ type: 'varchar', nullable: true, length: 11, comment: '手机号' })
  mobile: string;
}
