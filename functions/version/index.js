import λ from 'apex.js'
import PouchDB from 'pouchdb'
import connect from '../../db'

export const method = 'GET'
export const path = '/superfeed_version'

export const handler = async function (e) {
  let db = new PouchDB(connect('meta'))
  let version = await db.get('version')

  return version
}

export default λ(handler)
