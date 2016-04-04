module.exports.DB = (function connect () {
  return process.env.NODE_ENV === 'production' || process.env.DB_ENV === 'production'
    ? { host: 'rdb.superfeed.xyz', db: 'sf', authKey: process.env.RDB_AUTH_KEY }
    : { db: 'sf' }
})()

module.exports.APP_ID = process.env.NODE_ENV === 'production'
  ? '1704028006536118'
  : '1704068519865400'
