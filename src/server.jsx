import 'babel-polyfill'
import 'isomorphic-fetch'

import soular from 'soular'
import serveStatic from 'soular/static'
import ping from 'soular/ping'
import cors from 'soular/cors'

import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'
import Container, { configureStore } from './Container'

const DEBUG = process.env.NODE_ENV !== 'production'
const APP_PORT = DEBUG ? 3001 : process.env.PORT || 8080

soular('*')
.use(cors)
.use(ping)

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

.use((ctx) => new Promise((resolve, reject) => {
  const store = configureStore()
  const initialState = JSON.stringify(store.getState())
  const memoryHistory = createMemoryHistory(ctx.req.url)
  const history = syncHistoryWithStore(memoryHistory, store)

  const appScript = process.env.NODE_ENV === 'production'
    ? process.env.STATIC === 'local'
      ? require('./stats').main
      : '//static.superfeed.xyz/' + require('./stats').main
    : 'app.js'

  match({ history, routes, location: ctx.req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      reject(error)
    } else if (redirectLocation) {
      resolve({
        status: 302,
        headers: {
          Location: redirectLocation.pathname + redirectLocation.search
        }
      })
    } else if (renderProps) {
      const app = renderToString(
        <Container store={store}>
          <RouterContext {...renderProps} />
        </Container>
      )

      resolve('<!doctype html>' + renderToStaticMarkup(
        <html lang='en'>
          <head>
            <title>SuperFeed</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css' />
            <link rel='stylesheet' href='https://oss.maxcdn.com/semantic-ui/2.1.8/semantic.min.css' />
            <script dangerouslySetInnerHTML={{ __html: 'window.__REDUX_INIT = ' + initialState }}></script>
            <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'></script>
          </head>
          <body>
            <div id='root' dangerouslySetInnerHTML={{ __html: app }}></div>
            <script src={appScript}></script>
          </body>
        </html>
      ))
    } else {
      resolve()
    }
  })
}))

.use(serveStatic('', DEBUG ? 'resources/static' : 'static'))

.listen(APP_PORT)

.on('listening', () => console.log(`Server listening at ${APP_PORT}`))
