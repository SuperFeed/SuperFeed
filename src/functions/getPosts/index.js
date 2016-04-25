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
import Twitter from 'twitter'
import { DB } from '../../db'

export const method = 'GET'
export const path = '/api/getPosts'

function getTweets () {
  const twitterClient = new Twitter({
    consumer_key: 'lmkXpy3S1Tw5olujvoG3H1kDJ',
    consumer_secret: 'OESLaYYxrtppzRYGajPDgRTyjeBW1P52Ne3UpMFt6CNYZZ9548',
    access_token_key: '', access_token_secret: ''
  })

  return new Promise(function (resolve, reject) {
    twitterClient.get('search/tweets', {
      geocode: '42.7299111,-73.6772041,1mi'
    }, function (error, tweets) {
      if (error) reject(error)
      resolve(tweets.statuses.map((tweet) => ({
        type: 'twitter',
        id: tweet.id,
        author: tweet.user.id,
        name: tweet.user.name,
        body: tweet.text,
        created: tweet.created_at
      })))
    })
  })
}

export const handler = async function (e) {
  let conn = await r.connect(DB)
  let cursor = await r.table('posts').orderBy({ index: r.desc('created') }).run(conn)
  let results = await cursor.toArray()

  let tweets = await getTweets()

  return { posts: results.concat(tweets) }
}
