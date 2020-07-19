import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column, CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm'
import { Review } from './Review'
import { Like } from './Like'

export class UserData {
  name: string;
  kakaoID: number;
  profileURL: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  name: string;

  @Column()
  kakaoID: number;

  @Column({ name: 'profile_url' })
  profileURL: string;

  @Column({ default: '' })
  email: string;

  @CreateDateColumn({ name: 'createdAt', type: 'datetime' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt', type: 'datetime' })
  updatedAt: Date

  @OneToMany(
    (type) => Review,
    (review) => review.user,
  )
  reviews: Review[];

  @OneToMany(
    (type) => Like,
    (like) => like.user,
  )
  likes: Like[];
}
