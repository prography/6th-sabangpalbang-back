import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Flavor extends BaseEntity {
    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    name: string;

    @Column()
    description: string;
}
