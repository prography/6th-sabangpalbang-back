import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Flavor extends BaseEntity {
    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    name: string;

    @Column()
    description: string;

    static async saveData(name: string, description: string) {
      const flavor = new Flavor()
      flavor.name = name
      flavor.description = description
      await Flavor.save(flavor)
    }

    static async findByName(name: string) {
      return await Flavor.findOne({ where: { name } })
    }
}
