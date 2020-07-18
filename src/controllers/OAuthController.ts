import { Get, JsonController, QueryParam } from 'routing-controllers'
import axios from 'axios'

@JsonController('/oauth')
export class UserController {
  @Get('/redirect')
  async redirectController(@QueryParam('code') code: string) {
    const codeData = await axios.get(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`)
    const accessToken = codeData.data.access_token
    const userData = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return userData.data
  }
}
