'use strict'

import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'
import { createConnection } from 'typeorm'
const baseDir = __dirname
createConnection().then(async (connection) => {
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
