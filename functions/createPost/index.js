import 'isomorphic-fetch'
import λ from 'apex.js'
import r from 'rethinkdb'
import { DB } from '../../constants'

export const method = 'POST'
export const path = '/superfeed_createPost'

export const handler = async function ({ author, accessToken, body }) {
  let { name, id } = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`).then(res => res.json())

  if (id !== author) {
    throw new Error('Author does not match access token!')
  }

  let conn = await r.connect(DB)

  let res = await r.table('posts').insert({
    name,
    body
  }).run(conn)

  return { id: res.generated_keys[0] }
}

export default λ(handler)
