/**
 * @api {post} /superfeed_addComment Add Comment
 * @apiGroup Posts
 * @apiDescription Append a comment into 'comments' field of table 'posts'
 *
 * @apiParam {String} author Author's FB id
 * @apiParam {String} accessToken Author's FB access token
 * @apiParam {String} comment the comment body
 * @apiParam {String} postId the id of post in DB
 *
 * @apiSuccess {bool} return true if the comment is stored correctly
 */

import λ from 'apex.js'
import 'isomorphic-fetch'
import r from 'rethinkdb'
import { DB } from '../../db'

export const method = 'POST'
export const path = '/superfeed_addComment'

export const handler = async function ({ author, accessToken, comment, postId }) {
  let { name, id } = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`).then((res) => res.json())

  if (id !== author) {
    throw new Error('Author does not match access token!')
  }

  let conn = await r.connect(DB)

  let dbPost = r.table('posts').get(postId)

  dbPost.update(
    {comments: r.row('comments').append({
      'name': name,
      'author': id,
      'comment': comment
    })}
  ).run(conn)

  return { success: true }
}

export default λ(handler)
