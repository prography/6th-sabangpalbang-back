import { Get, JsonController } from 'routing-controllers'
import { Cocktail } from '../entity/Cocktail'

@JsonController('/cocktails')
export class CocktailController {
  @Get('/')
  async getCocktailList() {
    const cocktails = await Cocktail.search()
    return { cocktails }
  }
}
