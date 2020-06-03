import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne, JoinColumn,
} from 'typeorm'
import { Cocktail } from './Cocktail'

@Entity()
export class AbvClassification extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  minAbv: number

  @Column()
  maxAbv: number;

  @Column()
  description: string;

  @OneToOne((type) => Cocktail)
  @JoinColumn()
  cocktail: Cocktail;
}
