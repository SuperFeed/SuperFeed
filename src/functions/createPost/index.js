/**
 * @api {post} /superfeed_createPost Create Post
 * @apiGroup Posts
 * @apiDescription Creates a either a text or image post
 *
 * @apiParam {String} author Author's FB id
 * @apiParam {String} accessToken Author's FB access token
 * @apiParam {String} body The post's text body
 * @apiParam {String} img The base64 encoded image
 *
 * @apiSuccess {String} id Generated post id
 */

import 'isomorphic-fetch'
import r from 'rethinkdb'
import { DB } from '../../db'

export const method = 'POST'
export const path = '/api/createPost'

function storeImg (img) {
  const imgPath = '_static/' + Math.random().toString().slice(2)
  require('fs').writeFileSync(imgPath, img)

  return Promise.resolve(imgPath)
}

export const handler = async function ({ author, accessToken, body, img }) {
  let { id, name } = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`).then((res) => res.json())

  if (id !== author) {
    throw new Error('Author does not match access token!')
  }

  let imgPath = await (img ? storeImg(img) : Promise.resolve(null))

  let conn = await r.connect(DB)

  let res = await r.table('posts').insert({
    author,
    name,
    body,
    imgPath,
    likes: [],
    comments: [],
    created: new Date()
  }).run(conn)

  return { id: res.generated_keys[0] }
}
