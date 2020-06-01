import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  name: string;

  static async saveData(name: string) {
    const tag = new Tag()
    tag.name = name
    await Tag.save(tag)
  }

  static async findByName(name: string) {
    return await Tag.findOne({ where: { name } })
  }
}

