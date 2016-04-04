import { packageActions } from 'redux-reaction'
import auth from './auth'
import posts from './posts'

export default packageActions({ auth, posts })

export const selector = (state) => state
