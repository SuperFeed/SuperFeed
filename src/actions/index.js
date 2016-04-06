import { packageActions } from 'redux-reaction'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import app from './app'

export default packageActions({ routing: { reducer: routerReducer }, auth, app })

export const selector = (state) => state
