'use strict'
const express = require('express')
const asyncify = require('express-asyncify')
const app = asyncify(express())
const fs = require('fs')
const models = require('./models')
models.sequelize.sync({force: true})
  .then(() => {
    console.log('DB connection success')
  })
  .catch(err => {
    console.log(`DB connection error: ${err}`)
    process.exit()
  })
const bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '10mb', extended: true}))

const obj = JSON.parse(fs.readFileSync('./routes/route.json', 'utf8'))
obj.map(v => {
  try {
    app[v.method](`/api/v1${v.path}`, require('./routes/' + v.handler))
  } catch (e) {
    console.log(e)
  }
})

app.get('/', (req, res) => {
  return res.send('pong')
})

app.listen(3000)
