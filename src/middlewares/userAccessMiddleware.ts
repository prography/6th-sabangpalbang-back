// eslint-disable-next-line no-unused-vars
import { ExpressMiddlewareInterface } from 'routing-controllers'
import * as jwt from 'jsonwebtoken'
/**
 * 유저 권한 체크 미들웨어
 */
export class UserAccessMiddleware implements ExpressMiddlewareInterface {
  /**
   * 미들웨어
   * @param {any} request
   * @param {any} response
   * @param {any} next
   */
  async use(request: any, response: any, next: any): Promise<void> {
    const { authorization } = request.headers
    if (!authorization) {
      return response.status(401).json({
        message: '인증정보가 없습니다.',
      })
    }
    const accessToken = authorization.split('Bearer ')[1]
    // jwt verify check
    let jwtData
    try {
      jwtData = await jwt.verify(accessToken, process.env.JWT_SECRET_SIGNATURE)
    } catch (e) {
      if (e.message === 'jwt expired') {
        return response.status(403).json({
          message: '만료된 토큰입니다.',
        })
      }
    }
    if (!jwtData) {
      return response.status(403).json({
        message: '비정상적인 토큰입니다.',
      })
    }
    request.headers['x-user-phone'] = jwtData.data.phone
    request.headers['x-bigcar-token'] = accessToken
    next()
  }
}
