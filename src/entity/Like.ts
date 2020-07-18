import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn, ManyToOne,
} from 'typeorm'
import { User } from './User'
import { Cocktail } from './Cocktail'

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(
    (type) => Cocktail,
    (cocktail) => cocktail.likes,
  )
  cocktail: Cocktail;

  @ManyToOne(
    (type) => User,
    (user) => user.likes,
  )
  user: User;

  @CreateDateColumn({ name: 'createdAt', type: 'datetime' })
  createdAt: Date
}
