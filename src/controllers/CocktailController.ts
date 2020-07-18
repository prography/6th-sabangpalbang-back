import { Get, JsonController, Param, QueryParam } from 'routing-controllers'
import { Cocktail } from '../entity/Cocktail'
import { Between, getConnectionManager, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm'
import { BadRequestError } from '../http-errors/BadRequestError'

@JsonController('/cocktails')
export class CocktailController {
  private cocktailRepository: Repository<Cocktail>;

  constructor() {
    this.cocktailRepository = getConnectionManager().get().getRepository(Cocktail)
  }

  @Get('/')
  async getCocktailList(
    @QueryParam('name') name: string,
    @QueryParam('offset') offset: number,
    @QueryParam('limit') limit: number,
    @QueryParam('abvMin') abvMin: number,
    @QueryParam('abvMax') abvMax: number,
    @QueryParam('abvSort') abvSort: string,
  ) {
    if (offset && !limit) {
      throw new BadRequestError('offset 값은 limit 없이 사용할 수 없습니다.')
    }
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
    const order: any = {}
    if (abvSort) {
      if (abvSort == 'ASC' || abvSort == 'DESC') {
        order.abv = abvSort
      } else {
        throw new BadRequestError('도수 정렬 값은 ASC 혹은 DESC만 가능합니다.')
      }
    }
    const cocktails = await this.cocktailRepository.find({
      where,
      relations: ['tags', 'flavors', 'base', 'abvClassification'],
      take: limit,
      skip: offset,
      order,
    })
    return { cocktails }
  }

  @Get('/random')
  async getCocktailRandom() {
    const [cocktails, cocktailCount] = await this.cocktailRepository.findAndCount()
    return await this.cocktailRepository.findOne({
      where: {
        idx: Math.floor(Math.random() * (cocktailCount - 1)) + 1,
      },
      relations: ['tags', 'flavors', 'base', 'abvClassification'],
    })
  }

  @Get('/:cocktailIdx')
  async getCocktailDetail(@Param('cocktailIdx') cocktailIdx: string) {
    const cocktails = await this.cocktailRepository.find({
      where: {
        idx: cocktailIdx,
      },
      relations: ['tags', 'flavors', 'base', 'abvClassification'],
    })
    return { cocktails }
  }
}
