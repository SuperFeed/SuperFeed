import Root from './Root'
import Home from './Home'
import Login from './Login'
import App from './App'

export default {
  path: '/',
  component: Root,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/login', component: Login },
    { path: '/app', component: App }
  ]
}
