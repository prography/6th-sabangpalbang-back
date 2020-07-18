import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  cocktailIdx: number;

  @Column()
  userIdx: number;

  @Column()
  comment: string;

  @CreateDateColumn({ name: 'createdAt', type: 'datetime' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt', type: 'datetime' })
  updatedAt: Date
}
