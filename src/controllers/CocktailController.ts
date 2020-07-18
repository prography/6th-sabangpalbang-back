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
    @QueryParam('tag') tag: string,
    @QueryParam('base') base: string,
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

  // TODO: 아래 route랑 중복되서 나오는 에러 해결 필요
  @Get('/random')
  async getCocktailRandom() {
    return await this.cocktailRepository
      .createQueryBuilder('cocktail')
      .orderBy('RAND()')
      .getOne()
  }

  @Get('/:cocktailIdx')
  async getCocktailDetail(@Param('cocktailIdx') cocktailIdx: string) {
    return await this.cocktailRepository
      .createQueryBuilder('cocktail')
      .where('cocktail.idx = :cocktailIdx', { cocktailIdx })
      .getOne()
  }
}
