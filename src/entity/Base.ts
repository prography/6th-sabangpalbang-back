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

  static async saveData(imgUrl: string, name: string, abv: number, description: string) {
    const base = new Base()
    base.imgUrl = imgUrl
    base.name = name
    base.abv = abv
    base.description = description
    await Base.save(base)
  }

  static async findDataForCocktail(name: string) {
    return await Base.findOne({
      where: { name },
    })
  }
}
