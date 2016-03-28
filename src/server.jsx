import 'babel-polyfill'
import 'isomorphic-fetch'

import soular from 'soular'
import serveStatic from 'soular/static'
import router from 'soular/react-router'

import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

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
  const appScript = process.env.NODE_ENV === 'production'
    ? require('./stats').main
    : 'app.js'

  const store = configureStore()
  const initialState = JSON.stringify(store.getState())

  const app = renderToString(
    <Container store={store}>
      {content}
    </Container>
  )

  return '<!doctype html>' + renderToStaticMarkup(
    <html>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <script dangerouslySetInnerHTML={{ __html: 'window.__REDUX_INIT = ' + initialState }}></script>
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'></script>
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css' />
        <link rel='stylesheet' href='//oss.maxcdn.com/semantic-ui/2.1.8/semantic.min.css' />
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
