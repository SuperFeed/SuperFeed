import 'babel-polyfill'
import 'isomorphic-fetch'

import soular from 'soular'
import serveStatic from 'soular/static'
import router from 'soular/react-router'

import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import Helmet from 'react-helmet'

import routes from './routes'
import Container, { configureStore } from './Container'

const DEBUG = process.env.NODE_ENV !== 'production'
const APP_PORT = DEBUG ? 3001 : process.env.PORT || 8080

soular('*')

.use((ctx) => {
  if (ctx.req.headers['x-forwarded-proto'] === 'http') {
    return {
      status: 302,
      headers: { Location: 'https://' + ctx.req.headers.host + ctx.req.url },
      body: '',
      $force: true
    }
  }
})

.use(router(routes, (content) => {
  const head = Helmet.rewind()
  const attrs = head.htmlAttributes.toComponent()

  const appScript = process.env.NODE_ENV === 'production'
    ? process.env.STATIC === 'local'
      ? require('./stats').main
      : '//static.superfeed.xyz/' + require('./stats').main
    : 'app.js'

  const store = configureStore()
  const initialState = JSON.stringify(store.getState())

  const app = renderToString(
    <Container store={store}>
      {content}
    </Container>
  )

  return '<!doctype html>' + renderToStaticMarkup(
    <html {...attrs}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        <script dangerouslySetInnerHTML={{ __html: 'window.__REDUX_INIT = ' + initialState }}></script>
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{ __html: app }}></div>
        <script src={appScript}></script>
      </body>
    </html>
  )
}))

.use(serveStatic('', DEBUG ? 'resources/static' : 'static'))

.listen(APP_PORT)

.on('listening', () => console.log(`Server listening at ${APP_PORT}`))
