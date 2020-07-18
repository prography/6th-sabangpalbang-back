import { BodyParam, HeaderParam, JsonController, Post, UseBefore } from 'routing-controllers'
import { UserAccessMiddleware } from '../middlewares/userAccessMiddleware'
import { Review } from '../entity/Review'
import { ConflictError } from '../http-errors/ConflictError'
import { Cocktail } from '../entity/Cocktail'
import { User } from '../entity/User'

@UseBefore(UserAccessMiddleware)
@JsonController('/users')
export class CocktailController {
  @Post('/reviews')
  async postReview(
    @HeaderParam('x-user-idx') userIdx: number,
    @BodyParam('cocktailIdx') cocktailIdx: number,
    @BodyParam('comment') comment: string,
  ) {
    const cocktail = await Cocktail.findOne(cocktailIdx)
    const user = await User.findOne(userIdx)
    const existReview = await Review.findOne({ where: { user, cocktail } })
    if (existReview) {
      throw new ConflictError('이미 해당 칵테일에 작성된 리뷰가 있습니다.')
    }
    const review = new Review()
    review.cocktail = cocktail
    review.comment = comment
    review.user = user
    await review.save()
    return {}
  }
}
