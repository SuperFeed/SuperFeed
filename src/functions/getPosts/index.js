/**
 * @api {get} /superfeed_getPosts Get Posts
 * @apiGroup Posts
 * @apiDescription Gets all posts from a location
 *
 * @apiParam {Number[]} location The coordinates of where the user is located
 *
 * @apiSuccess {Post[]} posts Array of posts from the requested location
 */

import r from 'rethinkdb'
import { DB } from '../../db'

export const method = 'GET'
export const path = '/api/getPosts'

export const handler = async function (e) {
  let conn = await r.connect(DB)
  let cursor = await r.table('posts').run(conn)
  let results = await cursor.toArray()

  return { posts: results }
}
