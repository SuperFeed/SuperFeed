/**
 * @api {get} /superfeed_version Version
 * @apiGroup Info
 * @apiDescription Returns the current API version
 *
 * @apiSuccess {String} version The current API version
 */

import r from 'rethinkdb'
import { DB } from '../../db'

export const method = 'GET'
export const path = '/api/version'

export const handler = async function () {
  let conn = await r.connect(DB)
  let { number } = await r.table('meta').get('version').run(conn)

  return { version: number }
}
