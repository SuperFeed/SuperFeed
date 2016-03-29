module.exports = function connect (db) {
  return process.env.NODE_ENV === 'production'
    ? { name: 'https://db.superfeed.xyz/' + db, auth: { username: process.env.COUCH_USERNAME, password: process.env.COUCH_PASSWORD } }
    : { name: 'SFDB' + (db || ''), db: require('memdown') }
}
