import { Get, JsonController } from 'routing-controllers'
import { AbvClassification } from '../entity/AbvClassification'

@JsonController('/abvs')
export class AbvClassificationController {
  @Get('/')
  async getAbvClassificationList() {
    const abvs = await AbvClassification.findAll() 
    return { abvs }
  }
}