import React from 'react'
import ReactDOM from 'react-dom'
import { Router, match, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import Container, { configureStore } from './Container'

navigator.geolocation.getCurrentPosition(({ coords }) => console.info(coords))

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

match({ history, routes }, (error, redirectLocation, renderProps) => {
  if (error) return console.error(error)

  ReactDOM.render(
    <Container store={store}>
      <Router {...renderProps} />
    </Container>, document.getElementById('root')
  )
})
