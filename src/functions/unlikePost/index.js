/**
 * @api {post} /superfeed_unlikePost Unlike Post
 * @apiGroup Posts
 * @apiDescription Remove the user from the list of people who have liked the post
 *
 * @apiParam {String} user User's FB id
 * @apiParam {String} accessToken Author's FB access token
 * @apiParam {String} post The post's id
 *
 * @apiSuccess {Bool} done True if unliked the post, false if wasn't liked
 */

import 'isomorphic-fetch'
import r from 'rethinkdb'
import { DB } from '../../db'

export const method = 'POST'
export const path = '/api/unlikePost'

export const handler = async function ({ user, accessToken, post }) {
  let { id } = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`).then((res) => res.json())

  if (id !== user) {
    throw new Error('Author does not match access token!')
  }

  let conn = await r.connect(DB)

  let dbPost = r.table('posts').get(post)

  let likeIndices = await dbPost.getField('likes').offsetsOf(user).run(conn)
  if (!likeIndices.length) return {succes: false}

  await dbPost.update({likes: r.row('likes').deleteAt(likeIndices[0])}).run(conn)

  return { success: true }
}
