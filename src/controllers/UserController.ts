import { BodyParam, JsonController, Post, UseBefore } from 'routing-controllers'
import { UserAccessMiddleware } from '../middlewares/userAccessMiddleware'

@UseBefore(UserAccessMiddleware)
@JsonController('/users')
export class CocktailController {
  @Post('/reviews')
  async postReview(
    @BodyParam('cocktailIdx') cocktailIdx: number,
    @BodyParam('comment') comment: string,
  ) {
    return {
      cocktailIdx,
      comment,
    }
  }
}
