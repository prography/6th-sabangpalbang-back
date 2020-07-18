import * as jwt from 'jsonwebtoken'
import { User } from '../entity/User'

// ONE WEEK
const ONE_WEEK_SECONDS = (60 * 60) * 24 * 7

/**
 * 액세스 토큰 발급 - 1주 동안 유효함
 * @return {string} accessToken
 * @param {UserData} data
 */
export const generateAccessToken =
  (data: User): string => {
    // ONE WEEK MilliSeconds
    const ACCESS_TOKEN_EXPIRE_SECONDS =
      Math.floor(Date.now() / 1000) + ONE_WEEK_SECONDS
    return jwt.sign({
      exp: ACCESS_TOKEN_EXPIRE_SECONDS,
      data,
    }, process.env.JWT_SECRET_SIGNATURE)
  }
