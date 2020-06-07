import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column, LessThanOrEqual, MoreThanOrEqual,
} from 'typeorm'

@Entity()
export class AbvClassification extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ name: 'min_abv' })
  minAbv: number

  @Column({ name: 'max_abv' })
  maxAbv: number;

  @Column()
  description: string;

  static async saveData(minAbv: number, maxAbv: number, description: string) {
    const abvClassification = new AbvClassification()
    abvClassification.minAbv = minAbv
    abvClassification.maxAbv = maxAbv
    abvClassification.description = description
    await AbvClassification.save(abvClassification)
  }

  static async findDataForCocktail(targetAbv: number) {
    return await AbvClassification.findOne({
      where: {
        minAbv: LessThanOrEqual(targetAbv),
        maxAbv: MoreThanOrEqual(targetAbv),
      },
    })
  }
}
