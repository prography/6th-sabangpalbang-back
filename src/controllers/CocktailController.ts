import { Get, JsonController, Param, QueryParam } from 'routing-controllers'
import { Cocktail } from '../entity/Cocktail'
import { Between, getConnectionManager, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm'

@JsonController('/cocktails')
export class CocktailController {
  private cocktailRepository: Repository<Cocktail>;

  constructor() {
    this.cocktailRepository = getConnectionManager().get().getRepository(Cocktail)
  }

  @Get('/')
  async getCocktailList(
    @QueryParam('tag') tag: string,
    @QueryParam('base') base: string,
    @QueryParam('name') name: string,
    @QueryParam('abvMin') abvMin: number,
    @QueryParam('abvMax') abvMax: number,
  ) {
    const where: any = {}
    if (name) where.name = Like(`%${name}%`)
    if (abvMin !== undefined && abvMax !== undefined) {
      where.abv = Between(abvMin, abvMax)
    }
    if (abvMin !== undefined && abvMax == undefined) {
      where.abv = MoreThanOrEqual(abvMin)
    }
    if (abvMin == undefined && abvMax !== undefined) {
      where.abv = LessThanOrEqual(abvMax)
    }
    const cocktails = await this.cocktailRepository.find({
      where,
      relations: ['tags', 'flavors', 'base', 'abvClassification'],
    })
    return { cocktails }
  }

  @Get('/:cocktailIdx')
  async getCocktailDetail(@Param('cocktailIdx') cocktailIdx: string) {
    const cocktail = await Cocktail.findOneByIdx(cocktailIdx)
    return cocktail
  }
}
