import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'

@Entity()
export class Base extends BaseEntity {
    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    imgUrl: string;

    @Column()
    name: string;

    @Column()
    abv: number;

    @Column()
    description: string;

  // @OneToMany(
  //   (type) => Cocktail,
  //   (cocktail) => cocktail.base
  // )
  // cocktails!: Cocktail[];
}
