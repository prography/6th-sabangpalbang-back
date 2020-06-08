import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

export class FlavorData {
  name: string
  description: string
}

@Entity()
export class Flavor extends BaseEntity {
    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    name: string;

    @Column()
    description: string;

    static async saveData(data: FlavorData) {
      const flavor = new Flavor()
      Object.assign(flavor, { ...data })
      await Flavor.save(flavor)
    }

    static async findByName(name: string) {
      return await Flavor.findOne({ where: { name } })
    }

    static async findAll() {
      return await Flavor.find()
    }
}
