import {
  Entity,
  EntityRepository,
  getCustomRepository,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomRepository } from '../repository';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  firstname!: string;

  @Column({ type: 'varchar' })
  lastname?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}

@EntityRepository(User)
class UserRepository extends CustomRepository<User> {}

export const Users = () => getCustomRepository(UserRepository);
