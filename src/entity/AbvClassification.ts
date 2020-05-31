import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Cocktail } from './Cocktail';

@Entity()
export class AbvClassification extends BaseEntity { 

    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    classification: string;

    @Column()
    description: string;


    // @OneToMany(
    //   (type) => Cocktail,
    //   (cocktail) => cocktail.abvClassification
    // )
    // cocktails!: Cocktail[];

}
