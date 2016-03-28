'use strict'

require('babel-register')
let fs = require('fs')
let soular = require('soular')
let route = require('soular/route')
let cors = require('soular/cors')
let reqq = require('reqq')

fs.readdirSync('functions')
  .map((func) => func !== 'db.js' ? require('./functions/' + func) : null)
  .reduce((_app, func) => !func
    ? _app
    : _app.use(route[func.method](func.path)((e) =>
      Promise.resolve(func.handler(e)).then((res) => ({ body: res }))
    )), soular('*')
  )
  .use(cors)
  .listen(3005)
  .on('listening', () => {
    console.log('API listening at 3005!')
    reqq.createServer()
  })
