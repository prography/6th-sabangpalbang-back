import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column, LessThanOrEqual, MoreThanOrEqual,
} from 'typeorm'

export class AbvClassificationData {
  minAbv: number
  maxAbv: number;
  description: string;
}

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

  static async saveData(data: AbvClassificationData) {
    const abvClassification = new AbvClassification()
    Object.assign(abvClassification, { ...data })
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
