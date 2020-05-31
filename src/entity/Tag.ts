import {Entity, BaseEntity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Tag extends BaseEntity { 

    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    name: string;

}
