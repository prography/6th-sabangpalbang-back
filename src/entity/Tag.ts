import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

export class TagData {
  name: string
}

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  name: string;

  static async saveData(tagData: TagData) {
    const tag = new Tag()
    Object.assign(tag, { ...tagData })
    await Tag.save(tag)
  }

  static async findByName(name: string) {
    return await Tag.findOne({ where: { name } })
  }

  static async findAll() {
    return await Tag.find()
  }
}

