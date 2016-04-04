import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import re, { selector } from './actions'
import Post from './components/Post'

@connect(selector, re.action)
export default class App extends Component {
  render () {
    const posts = this.props.posts.posts
      ? this.props.posts.posts.map((p) => <Post key={p.id} {...p}/>)
      : null

    return <div>
      <Helmet title='App' />
      <div className='ui container'>
        <p>Auth: {JSON.stringify(this.props.auth)}</p>
        {posts}
      </div>
    </div>
  }
}
