import { BodyParam, HeaderParam, JsonController, Patch, Post, UseBefore } from 'routing-controllers'
import { UserAccessMiddleware } from '../middlewares/userAccessMiddleware'
import { Review } from '../entity/Review'
import { ConflictError } from '../http-errors/ConflictError'
import { Cocktail } from '../entity/Cocktail'
import { User } from '../entity/User'
import { Like } from '../entity/Like'

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

  // 즐겨찾기 기능
  // 이미 즐겨찾기가 되어있는거 한번 더 호출하면 즐겨찾기 해제
  @Patch('/likes')
  async like(
    @HeaderParam('x-user-idx') userIdx: number,
    @BodyParam('cocktailIdx') cocktailIdx: number,
  ) {
    const cocktail = await Cocktail.findOne(cocktailIdx)
    const user = await User.findOne(userIdx)
    const existLike = await Like.findOne({ where: { user, cocktail } })
    if (existLike) {
      // 즐겨찾기 삭제
      await Like.delete({ user, cocktail })
      return {}
    }
    // 즐겨찾기 추가
    const like = new Like()
    like.cocktail = cocktail
    like.user = user
    await like.save()
    return {}
  }
}
