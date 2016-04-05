import { Reaction, groupActions } from 'redux-reaction'
import { SF_API } from '../api'

const initialState = {
  posts: []
}

const getPosts = Reaction('get posts', {
  async action (location, listen = true) {
    let { posts } = await SF_API.get('getPosts')

    return posts
  },

  reducer (state, { payload }) {
    return {
      ...state,
      posts: payload
    }
  }
})

export default groupActions({ getPosts }, initialState)
