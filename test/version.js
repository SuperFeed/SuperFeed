import 'babel-register'
import test from 'ava'
import { handler as VersionAPI } from '../functions/version'

test('Version', async (t) => {
  t.is(1, 1)
})
