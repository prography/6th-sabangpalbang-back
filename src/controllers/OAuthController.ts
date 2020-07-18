import { Get, JsonController, QueryParam, Res } from 'routing-controllers'
import axios from 'axios'
import { User } from '../entity/User'
import { Response } from 'express'
import { generateAccessToken } from '../libs/token'

@JsonController('/oauth')
export class UserController {
  @Get('/redirect')
  async redirectController(
    @Res() res: Response,
    @QueryParam('code') code: string,
  ) {
    const codeData = await axios.get(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`)
    const kakaoAccessToken = codeData.data.access_token
    const kakaoUserData = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    })
    const existUserData = await User.findOne({ where: { kakaoID: kakaoUserData.data.id } })
    const expires = new Date(Date.now() + 60 * 60 * 1000 * 24 * 7)
    if (!existUserData) {
      // 데이터가 없으면 가입
      const user = new User()
      const {
        id,
        properties: {
          nickname,
          profile_image: profileImage,
        },
        kakao_account: kakaoAccount,
      } = kakaoUserData.data
      user.kakaoID = id
      if (kakaoAccount.email) {
        user.email = kakaoAccount.email
      }
      user.name = nickname
      user.profileURL = profileImage
      const saveData = await user.save()
      delete saveData.kakaoID
      const accessToken = generateAccessToken(saveData)
      res.cookie('userToken', accessToken, {
        expires,
        domain: process.env.REDIRECT_URI.split(':3000')[0],
        path: '/',
      }).redirect(302, `http://${process.env.REDIRECT_URI}`)
      return
    }
    // 데이터가 있으면 로그인 진행
    delete existUserData.kakaoID
    const accessToken = generateAccessToken(existUserData)
    // TODO: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 해결
    res.cookie('userToken', accessToken, {
      expires,
      domain: process.env.REDIRECT_URI.split(':3000')[0],
      path: '/',
    }).redirect(302, `http://${process.env.REDIRECT_URI}`)
  }
}
