import λ from 'apex.js'
import 'isomorphic-fetch'
import r from 'rethinkdb'
import { DB } from '../../db'

export const method = 'POST'
export const path = '/superfeed_commentPost'

export const handler = async function ({ author, accessToken, comment, postId }) {
  let { name, id } = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`).then((res) => res.json())

  if (id !== author) {
    throw new Error('Author does not match access token!')
  }

  var newComment = {
    'commentBy': name,
    'userId': id,
    'commentText': comment
  }

  let conn = await r.connect(DB)

  let dbPost = r.table('posts').get(postId)

  await dbPost.update(
    {comments: r.row('comments').append(newComment)}
  ).run(conn)

  return { success: true }
}

export default λ(handler)
