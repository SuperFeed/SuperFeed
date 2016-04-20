import route from 'soular/route'

const useFunc = (func) =>
  route[func.method](func.path)((e) =>
    e.state.get('body').then(func.handler).then((body) => ({ body }))
  )

export default [
  require('./createPost'),
  require('./getPosts'),
  require('./likePost'),
  require('./unlikePost'),
  require('./version')
].map(useFunc)
