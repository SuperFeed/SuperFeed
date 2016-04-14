import 'isomorphic-fetch'
import λ from 'apex.js'
import r from 'rethinkdb'
import { DB } from '../../db'

export const method = 'POST'
export const path = '/superfeed_createPost'

function storeLocalImg (img) {
  const imgPath = '_static/' + Math.random().toString().slice(2)
  require('fs').writeFileSync(imgPath, img)

  return Promise.resolve(imgPath)
}

function storeS3Img (img) {
  const AWS = require('aws-sdk')
  const S3 = new AWS.S3()
  const imgPath = Math.random().toString().slice(2)

  return new Promise((resolve) => S3.putObject({
    Bucket: '00-superfeed-resources',
    Key: imgPath,
    Body: img
  }, resolve))
}

export const handler = async function ({ author, accessToken, body, img }) {
  let { name, id } = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`).then((res) => res.json())

  if (id !== author) {
    throw new Error('Author does not match access token!')
  }

  let storeImgFunc = process.env.NODE_ENV === 'production' || process.env.DB_ENV === 'production'
    ? storeS3Img
    : storeLocalImg

  let imgPath = await (img ? storeImgFunc(img) : Promise.resolve(null))

  let conn = await r.connect(DB)

  let res = await r.table('posts').insert({
    author,
    name,
    body,
    imgPath
  }).run(conn)

  return { id: res.generated_keys[0] }
}

export default λ(handler)
