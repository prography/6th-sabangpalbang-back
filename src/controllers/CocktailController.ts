import { Get, JsonController, Param } from 'routing-controllers'
import { Cocktail } from '../entity/Cocktail'

@JsonController('/cocktails')
export class CocktailController {
  @Get('/')
  async getCocktailList() {
    const cocktails = await Cocktail.search()
    return { cocktails }
  }

  @Get('/:cocktailIdx')
  async getCocktailDetail(@Param('cocktailIdx') cocktailIdx: string) {
    const cocktail = await Cocktail.findOneByIdx(cocktailIdx)
    return cocktail
  }
}
