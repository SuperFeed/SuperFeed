import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SF_API } from './api'
import re, { selector } from './actions'

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

    this.setState({ version, posts })
  }

  render () {
    return <div className='ui container'>
      <p>Auth: {JSON.stringify(this.props.auth)}</p>
      <p>Version: {JSON.stringify(this.state.version)}</p>
      <p>Posts: {JSON.stringify(this.state.posts)}</p>
    </div>
  }
}
