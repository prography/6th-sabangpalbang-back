import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class CocktailHasFlavor extends BaseEntity {
  @Column()
  cocktailIdx: number;

  @PrimaryGeneratedColumn()
  flavorIdx: number;

  // @Field(() => Cocktail)
  // @ManyToOne(() => Cocktail, cocktail => cocktail.idx, { nullable: true })
  // @JoinColumn({ name: "userId" })
  // user: Promise<User>;

  // @Field(() => Room)
  // @ManyToOne(() => Room, room => room.likeUsers, { nullable: true })
  // @JoinColumn({ name: "roomId" })
  // room: Promise<Room>;
}
