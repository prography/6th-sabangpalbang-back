import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Base } from './Base';
import { AbvClassification } from './AbvClassification'


@Entity()
export class Cocktail extends BaseEntity { 

    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    img_url: string;

    @Column()
    name: string;

    @Column()
    ingredients: string;

    @Column()
    abv: number;

    @Column()
    non_abv: number;

    @Column()
    description: string;

    @Column()
    base_idx: number;

    @Column()
    abv_classification_idx: number;

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
