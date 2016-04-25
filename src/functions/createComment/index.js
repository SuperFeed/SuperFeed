/**
 * @api {post} /superfeed_createComment Create Comment
 * @apiGroup Posts
 * @apiDescription Add a comment to a post
 *
 * @apiParam {String} author Author's FB id
 * @apiParam {String} accessToken Author's FB access token
 * @apiParam {String} post The post's id
 *
 * @apiSuccess {Bool} success Indicated completion
 */

import 'isomorphic-fetch'
import r from 'rethinkdb'
import { DB } from '../../db'

export const method = 'POST'
export const path = '/api/createComment'

export const handler = async function ({ author, accessToken, post, body }) {
  let { id, name } = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`).then((res) => res.json())

  if (id !== author) {
    throw new Error('Author does not match access token!')
  }

  let conn = await r.connect(DB)

  let dbPost = r.table('posts').get(post)

  await dbPost.update({ comments: r.row('comments').append({ author, name, body }) }).run(conn)

  return { success: true }
}
