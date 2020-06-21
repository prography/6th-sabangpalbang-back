import { Get, JsonController, Param, QueryParam } from 'routing-controllers'
import { Cocktail } from '../entity/Cocktail'
import {
  Between,
  createQueryBuilder,
  getConnectionManager,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm'
import { Tag } from '../entity/Tag'

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
    // TODO: base랑 tag 검색하기
    // const cocktails = await this.cocktailRepository.find({
    //   where,
    //   relations: ['tags', 'flavors', 'base', 'abvClassification'],
    // })
    // TODO: 기획적으로 base tag 검색 OR로 할지 AND로 할지 정하기
    const cocktail = await this.cocktailRepository
      .createQueryBuilder('cocktail')
      .innerJoinAndSelect('cocktail.tags', 'tag', 'tag.idx = :tagIdx', { tagIdx: 1 })
      // .where('cocktail.name like :name', { name: '%' + name + '%' })
      // .where('tags.idx = :userId OR holders IS NULL')
      // .leftJoinAndSelect('cocktail.tags', 'tag', 'cocktail.tags = :tags', { tags: '1' })
      // .leftJoinAndSelect('cocktail.flavors', 'flavor')
      .getMany()
    // console.log(cocktail)
    return { cocktail }
  }

  @Get('/:cocktailIdx')
  async getCocktailDetail(@Param('cocktailIdx') cocktailIdx: string) {
    const cocktail = await Cocktail.findOneByIdx(cocktailIdx)
    return cocktail
  }
}
