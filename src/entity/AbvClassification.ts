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

  @Column()
  minAbv: number

  @Column()
  maxAbv: number;

  @Column()
  description: string;

  static async saveData(minAbv: number, maxAbv: number, description: string) {
    const tag = new AbvClassification()
    tag.minAbv = minAbv
    tag.maxAbv = maxAbv
    tag.description = description
    await AbvClassification.save(tag)
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
