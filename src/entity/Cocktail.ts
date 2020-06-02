import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Base } from './Base'
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

  @Column()
  abvClassificationIdx: number;

  static async findOneByName(name: string) {
    return await Cocktail.findOne({ where: { name } })
  }

  // @ManyToOne(
  //   (type) => Base,
  //   (base) => base.cocktails, { nullable: false, onDelete: 'CASCADE' }
  // )
  // @JoinColumn({ name: "base_idx" })
  // base!: Base;

  // @ManyToOne(
  //   (type) => AbvClassification,
  //   (abvClassification) => abvClassification.cocktails, { nullable: false, onDelete: 'CASCADE' }
  // )
  // @JoinColumn({ name: "abv_classification_idx" })
  // abvClassification!: AbvClassification;
}
