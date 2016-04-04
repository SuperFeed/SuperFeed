import λ from 'apex.js'
import r from 'rethinkdb'
import db from '../../db'

export const method = 'POST'
export const path = '/superfeed_createPost'

export const handler = async function ({ author, body }) {
  let conn = await r.connect(db)

  let res = await r.table('posts').insert({
    author,
    body
  }).run(conn)

  return { id: res.generated_keys[0] }
}

export default λ(handler)
