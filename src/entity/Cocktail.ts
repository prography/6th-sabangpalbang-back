import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column, JoinColumn, ManyToOne, ManyToMany, JoinTable,
} from 'typeorm'
import { AbvClassification } from './AbvClassification'
import { Base } from './Base'
import { Tag } from './Tag'
import { Flavor } from './Flavor'

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

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[]

  @ManyToMany(() => Flavor)
  @JoinTable()
  flavors: Flavor[]

  @ManyToOne(() => Base)
  @JoinColumn()
  base: Base;

  @ManyToOne(() => AbvClassification)
  @JoinColumn()
  abvClassification: AbvClassification;

  static async findOneByName(name: string) {
    return await Cocktail.findOne({ where: { name } })
  }

  static async findOneByIdx(idx: string) {
    return await Cocktail.findOne({
      where: { idx },
      relations: ['tags', 'flavors', 'base', 'abvClassification'],
    })
  }

  // TODO: 검색으로 개선
  static async search() {
    return await Cocktail.find({
      relations: ['tags', 'flavors', 'base', 'abvClassification'],
    })
  }
}
