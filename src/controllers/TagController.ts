import { Get, JsonController } from 'routing-controllers'
import { Tag } from '../entity/Tag'

@JsonController('/tags')
export class TagController {
  @Get('')
  async getTagList() {
    const tags = await Tag.findAll()
    return { tags }
  }
}
