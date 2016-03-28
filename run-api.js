'use strict'

require('babel-register')
let fs = require('fs')
let soular = require('soular')
let route = require('soular/route')
let cors = require('soular/cors')
let reqq = require('reqq')

fs.readdirSync('functions')
  .map((func) => require('./functions/' + func))
  .reduce((_app, func) => _app.use(route[func.method](func.path)((e) => ({ body: func.handler(e) }))), soular('*'))
  .use(cors)
  .listen(3005)
  .on('listening', () => {
    console.log('API listening at 3005!')
    reqq.createServer()
  })
