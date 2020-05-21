'use strict'
// const express = require('express')
// const asyncify = require('express-asyncify')
// const app = asyncify(express())
// const fs = require('fs')
// const models = require('./models')
// models.sequelize.sync({force: true})
//   .then(() => {
//     console.log('DB connection success')
//   })
//   .catch(err => {
//     console.log(`DB connection error: ${err}`)
//     process.exit()
//   })
// const bodyParser = require('body-parser')
// app.use(bodyParser.json({limit: '10mb', extended: true}))
//
// const obj = JSON.parse(fs.readFileSync('./routes/route.json', 'utf8'))
// obj.map(v => {
//   try {
//     app[v.method](`/api/v1${v.path}`, require('./routes/' + v.handler))
//   } catch (e) {
//     console.log(e)
//   }
// })
//
// app.get('/', (req, res) => {
//   return res.send('pong')
// })

require("reflect-metadata"); // this shim is required
const {createExpressServer} = require("routing-controllers");
const {UserController} = require("./UserConroller");
// require("babel-core").transform("code", {
//   plugins: ["transform-decorators"]
// })
// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  controllers: [UserController] // we specify controllers we want to use
});

// run express application on port 3000
// app.listen(3000);

app.listen(3000)
