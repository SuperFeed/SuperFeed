module.exports.DB = (function connect () {
  return process.env.NODE_ENV === 'production' || process.env.DB_ENV === 'production'
    ? { host: 'rdb.superfeed.xyz', db: 'sf', authKey: process.env.RDB_AUTH_KEY }
    : { db: 'sf' }
})()
