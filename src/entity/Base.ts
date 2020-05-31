import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Cocktail } from './Cocktail';

@Entity()
export class Base extends BaseEntity { 

    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    img_url: string;

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
