import { Get, JsonController } from 'routing-controllers'
import { Flavor } from '../entity/Flavor'

@JsonController('/flavors')
export class FlavorController {
  @Get('')
  async getFlavorList() {
    const flavors = await Flavor.findAll()
    return { flavors }
  }
}
