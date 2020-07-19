'use strict'

import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'
import { createConnection } from 'typeorm'

const baseDir = __dirname
createConnection().then(async (connection) => {
  // const passport = require('passport')
  // const KakaoStrategy = require('passport-kakao').Strategy
  //
  // passport.use(new KakaoStrategy({
  //   clientID: process.env.KAKAO_CLIENT_ID,
  //   callbackURL: process.env.KAKAO_REDIRECT_URI,
  // },
  // async (accessToken, refreshToken, profile, done) => {
  //   // 사용자의 정보는 profile에 들어있다.
  //   console.log(accessToken)
  //   console.log(profile)
  //   const existUserData = await User.findOne({ where: { kakaoID: profile.id } })
  //   const expires = new Date(Date.now() + 60 * 60 * 1000 * 24 * 7)
  //   if (!existUserData) {
  //     // 데이터가 없으면 가입
  //     const user = new User()
  //     const {
  //       id,
  //       properties: {
  //         nickname,
  //         profile_image: profileImage,
  //       },
  //       kakao_account: kakaoAccount,
  //     } = profile._json
  //     user.kakaoID = id
  //     if (kakaoAccount.email) {
  //       user.email = kakaoAccount.email
  //     }
  //     user.name = nickname
  //     user.profileURL = profileImage
  //     const saveData = await user.save()
  //     delete saveData.kakaoID
  //     return done(null, profile._json)
  //   }
  //   return done(null, profile._json)
  // }))
  //
  // passport.serializeUser(function(user, done) {
  //   done(null, user)
  // })
  // passport.deserializeUser(function(obj, done) {
  //   done(null, obj)
  // })

  const app = createExpressServer({
    cors: {
      origin: true,
      credentials: true,
    },
    controllers: [baseDir + '/controllers/*.ts'],
  })

  // app.use(passport.initialize())
  // app.get('/login', passport.authenticate('kakao', { state: 'myStateValue' }))
  // app.get('/oauth/redirect', passport.authenticate('kakao'), function(req, res) {
  //   const user: any = {}
  //   console.log(req.session.passport.user)
  //   const {
  //     id,
  //     properties: {
  //       nickname,
  //       profile_image: profileImage,
  //     },
  //     kakao_account: kakaoAccount,
  //   } = req.session.passport.user
  //   user.kakaoID = id
  //   if (kakaoAccount.email) {
  //     user.email = kakaoAccount.email
  //   }
  //   user.name = nickname
  //   user.profileURL = profileImage
  //   const accessToken = generateAccessToken(user)
  //   const expires = new Date(Date.now() + 60 * 60 * 1000 * 24 * 7)
  //   // 로그인 시작시 state 값을 받을 수 있음
  //   res.setHeader('Access-Control-Allow-Credentials', '*')
  //   res.cookie('userToken', accessToken, {
  //     expires,
  //     domain: process.env.COOKIE_SET_DOMAIN,
  //     path: '/',
  //   })
  //   res.redirect(301, process.env.COOKIE_SET_REDIRECT)
  // })

  app.get('/ping', (req, res) => {
    return res.send('pong')
  })

  app.listen(3000, () => {
    console.log('서 버 러 닝')
  })
}).catch((error) => console.log(error))
