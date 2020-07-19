import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column, CreateDateColumn, UpdateDateColumn, ManyToOne,
} from 'typeorm'
import { User } from './User'
import { Cocktail } from './Cocktail'

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(
    (type) => Cocktail,
    (cocktail) => cocktail.reviews,
  )
  cocktail: Cocktail;

  @ManyToOne(
    (type) => User,
    (user) => user.reviews,
  )
  user: User;

  @Column()
  comment: string;

  @CreateDateColumn({ name: 'createdAt', type: 'datetime' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt', type: 'datetime' })
  updatedAt: Date
}
