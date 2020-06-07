import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'

export class BaseData {
  imgUrl: string;
  name: string;
  abv: number;
  description: string;
  textColor: string;
  backgroundColor: string;
}

@Entity()
export class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ name: 'img_url' })
  imgUrl: string;

  @Column()
  name: string;

  @Column()
  abv: number;

  @Column()
  description: string;

  @Column({ name: 'text_color' })
  textColor: string;

  @Column({ name: 'background_color' })
  backgroundColor: string;

  static async saveData(baseData: BaseData) {
    const base = new Base()
    base.imgUrl = baseData.imgUrl
    base.name = baseData.name
    base.abv = baseData.abv
    base.description = baseData.description
    base.textColor = baseData.textColor
    base.backgroundColor = baseData.backgroundColor
    await Base.save(base)
  }

  static async findDataForCocktail(name: string) {
    return await Base.findOne({
      where: { name },
    })
  }
}
