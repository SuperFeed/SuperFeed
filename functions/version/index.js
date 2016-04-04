import λ from 'apex.js'
import r from 'rethinkdb'
import db from '../../db'

export const method = 'GET'
export const path = '/superfeed_version'

export const handler = async function () {
  let conn = await r.connect(db)
  let { number } = await r.table('meta').get('version').run(conn)

  return { version: number }
}

export default λ(handler)
