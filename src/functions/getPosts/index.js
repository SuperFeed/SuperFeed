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

function fetchImg (imgPath) {
  var imgString = require('fs').readFileSync(imgPath, 'utf8')
  return imgString
}

export const handler = async function (e) {
  let conn = await r.connect(DB)
  let cursor = await r.table('posts').orderBy({ index: r.desc('created') }).run(conn)
  let results = await cursor.toArray()
  results.forEach(function (result) { result.imgPath = result.imgPath ? fetchImg(result.imgPath) : result.imgPath })

  return { posts: results }
}
