import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column, JoinColumn, ManyToOne, ManyToMany, JoinTable,
} from 'typeorm'
import { AbvClassification } from './AbvClassification'
import { Base } from './Base'
import { Tag } from './Tag'

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

  @ManyToMany(() => Tag, (tags) => tags.idx)
  @JoinTable()
  tags: Tag[]

  @ManyToOne(() => Base)
  @JoinColumn()
  base: Base;

  @ManyToOne(() => AbvClassification)
  @JoinColumn()
  abvClassification: AbvClassification;

  static async findOneByName(name: string) {
    return await Cocktail.findOne({ where: { name } })
  }
}
