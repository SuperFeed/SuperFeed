import λ from 'apex.js'

export const method = 'GET'
export const path = '/superfeed_getPosts'
export const handler = () => ({
  posts: [
    { author: 'dan', text: 'hello!' },
    { author: 'ryan', text: 'hola!' }
  ]
})

export default λ(handler)
