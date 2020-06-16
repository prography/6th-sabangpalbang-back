import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column, JoinColumn, ManyToOne, ManyToMany, JoinTable, Unique,
} from 'typeorm'
import { AbvClassification } from './AbvClassification'
import { Base } from './Base'
import { Tag } from './Tag'
import { Flavor } from './Flavor'

export class CocktailData {
  imgUrl: string;
  backgroundImgUrl: string;
  name: string;
  ingredients: string;
  abv: number;
  nonAbv: boolean;
  description: string;
  tags: Tag[]
  flavors: Flavor[]
  base: Base;
  abvClassification: AbvClassification;
}

@Entity()
@Unique(['name'])
export class Cocktail extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ name: 'img_url' })
  imgUrl: string;

  @Column({ name: 'background_img_url' })
  backgroundImgUrl: string;

  @Column()
  name: string;

  @Column()
  ingredients: string;

  @Column()
  abv: number;

  @Column({ name: 'non_abv' })
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
  @JoinColumn({ name: 'abv_classification' })
  abvClassification: AbvClassification;

  static async saveData(data: CocktailData) {
    const cocktail = new Cocktail()
    Object.assign(cocktail, { ...data })
    return await cocktail.save()
  }

  static async findOneByName(name: string) {
    return await Cocktail.findOne({ where: { name } })
  }

  static async findOneByIdx(idx: string) {
    return await Cocktail.findOne({
      where: { idx },
      relations: ['tags', 'flavors', 'base', 'abvClassification'],
    })
  }
}
