'use strict'

import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'
import { createConnection } from 'typeorm'
// import { User } from './entity/User'
// TODO: 배포할땐 ormconfig.json 에서 synchronize false를 해야함미마
const baseDir = __dirname
createConnection().then(async (connection) => {
  // const user = new User()
  // user.firstName = 'Timber'
  // user.lastName = 'Saw'
  // user.age = 25
  // await connection.manager.save(user)
  // const users = await connection.manager.find(User)
  const app = createExpressServer({
    cors: true,
    controllers: [baseDir + '/controllers/*.ts'],
  })

  app.get('/ping', (req, res) => {
    return res.send('pong')
  })
  app.listen(3000, () => {
    console.log('서 버 러 닝')
  })
}).catch((error) => console.log(error))
