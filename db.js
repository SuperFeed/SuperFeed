module.exports.DB = (function connect () {
  return process.env.NODE_ENV === 'production' || process.env.DB_ENV === 'production'
    ? { host: 'rdb.superfeed.xyz', db: 'sf', user: 'lambda', password: process.env.RDB_AUTH_KEY }
    : { db: 'sf' }
})()

module.exports.createDatabase = function () {
  var r = require('rethinkdb')
  var conn

  r.connect({})
    .then((c) => { conn = c })
    .then(() => r.dbCreate('sf').run(conn))
    .catch(() => console.log('DB `sf` already exists!'))
    .then(() => r.db('sf').tableCreate('meta').run(conn))
    .catch(() => console.log('Table `meta` already exists!'))
    .then(() => r.db('sf').tableCreate('posts').run(conn))
    .catch(() => console.log('Table `posts` already exists!'))
    .then(() => r.db('sf').table('meta').insert({
      id: 'version',
      number: 1
    }).run(conn))
    // .catch(() => console.log('Document `version` already exists!'))
    .then(() => console.log('Done creating DB!'))
    .catch((e) => console.log(e.stack))
    .then(() => process.exit(0))
}

module.exports.dropDatabase = function () {
  var r = require('rethinkdb')
  var conn

  r.connect({})
    .then((c) => { conn = c })
    .then(() => r.dbDrop('sf').run(conn))
    .catch(() => console.log('No DB `sf`!'))
    .then(() => console.log('Done dropping DB!'))
    .catch((e) => console.log(e))
    .then(() => process.exit(0))
}
