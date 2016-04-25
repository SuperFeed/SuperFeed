/**
 * @api {post} /superfeed_likePost Like Post
 * @apiGroup Posts
 * @apiDescription Add the user to the list of people who have liked the post
 *
 * @apiParam {String} user User's FB id
 * @apiParam {String} accessToken Author's FB access token
 * @apiParam {String} post The post's id
 *
 * @apiSuccess {Bool} done True if liked the post, false if already liked
 */

import 'isomorphic-fetch'
import r from 'rethinkdb'
import { DB } from '../../db'

export const method = 'POST'
export const path = '/api/likePost'

export const handler = async function ({ user, accessToken, post }) {
  let { id } = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`).then((res) => res.json())

  if (id !== user) {
    throw new Error('Author does not match access token!')
  }

  let conn = await r.connect(DB)

  let dbPost = r.table('posts').get(post)

  let alreadyLiked = await dbPost.getField('likes').contains(user).run(conn)
  if (alreadyLiked) return {success: false}

  await dbPost.update({likes: r.row('likes').append(user)}).run(conn)

  return { success: true }
}
