import λ from 'apex.js'
import r from 'rethinkdb'
import { DB } from '../../db'

export const method = 'GET'
export const path = '/superfeed_version'

export const handler = async function () {
  let conn = await r.connect(DB)
  let { number } = await r.table('meta').get('version').run(conn)

  return { version: number }
}

export default λ(handler)
