import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { SF_API } from './api'
import re, { selector } from './actions'
import Post from './components/Post'

@connect(selector, re.action)
export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      version: null,
      posts: null
    }
  }

  async componentDidMount () {
    let [version, posts] = await Promise.all([
      SF_API.get('version'),
      SF_API.get('getPosts')
    ])

    this.setState({ version, posts: posts.posts })
  }

  render () {
    const posts = this.state.posts
      ? this.state.posts.map((p) => <Post key={p.author} {...p}/>)
      : null

    return <div className='ui container'>
      <Helmet title='Home' />
      <p>Auth: {JSON.stringify(this.props.auth)}</p>
      <p>Version: {JSON.stringify(this.state.version)}</p>
      {posts}
    </div>
  }
}
