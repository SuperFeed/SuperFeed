import λ from 'apex.js'
import r from 'rethinkdb'
import db from '../../db'

export const method = 'GET'
export const path = '/superfeed_getPosts'

export const handler = async function (e) {
  let conn = await r.connect(db)
  let cursor = await r.table('posts').run(conn)
  let results = await cursor.toArray()

  return { posts: results }
}

export default λ(handler)
