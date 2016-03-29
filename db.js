module.exports = function connect (db) {
  return process.env.NODE_ENV === 'production'
    ? { name: 'http://db.superfeed.xyz:5984/' + 'meta', auth: { username: process.env.COUCH_USERNAME, password: process.env.COUCH_PASSWORD } }
    : { name: 'SFDB' + (db || ''), db: require('memdown') }
}
