import { Get, JsonController } from 'routing-controllers'
import { Base } from '../entity/Base'

@JsonController('/bases')
export class BaseController {
  @Get('/')
  async getBaseList() {
    const bases = await Base.findAll()
    return { bases }
  }

}
