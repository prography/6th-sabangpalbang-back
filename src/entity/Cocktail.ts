import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column, JoinColumn, ManyToOne,
} from 'typeorm'
import { AbvClassification } from './AbvClassification'

@Entity()
export class Cocktail extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  imgUrl: string;

  @Column()
  name: string;

  @Column()
  ingredients: string;

  @Column()
  abv: number;

  @Column()
  nonAbv: boolean;

  @Column()
  description: string;

  @Column()
  baseIdx: number;

  @ManyToOne(() => AbvClassification)
  @JoinColumn()
  abvClassification: AbvClassification;

  static async findOneByName(name: string) {
    return await Cocktail.findOne({ where: { name } })
  }
}
