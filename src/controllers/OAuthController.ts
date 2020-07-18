import { Get, JsonController, QueryParam } from 'routing-controllers'
import axios from 'axios'
import { User } from '../entity/User'

@JsonController('/oauth')
export class UserController {
  @Get('/redirect')
  async redirectController(@QueryParam('code') code: string) {
    const codeData = await axios.get(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`)
    const accessToken = codeData.data.access_token
    const kakaoUserData = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const existUserData = await User.findOne({ where: { kakaoID: kakaoUserData.data.id } })
    if (!existUserData) {
      // 데이터가 없으면 가입
      const user = new User()
      const {
        id,
        properties: {
          nickname,
          profile_image: profileImage,
        },
        kakao_account: {
          email,
        },
      } = kakaoUserData.data
      user.kakaoID = id
      user.email = email
      user.name = nickname
      user.profileURL = profileImage
      const saveData = await user.save()
      console.log(saveData)
      // TODO: token 발급
    }
    // 데이터가 있으면 로그인 진행
    console.log(existUserData)
    return kakaoUserData.data
  }
}
