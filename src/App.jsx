import React, { Component } from 'react'
import { connect } from 'react-redux'
import re, { selector } from './actions'
import { SF_API } from './api'
import Nav, { Container } from './components/Nav'
import Post from './components/Post'

@connect(selector, re.action)
export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      createPostText: ''
    }
  }

  async createPost () {
    await SF_API.post('createPost', {
      author: this.props.auth.id,
      accessToken: this.props.auth.accessToken,
      body: this.state.createPostText,
      img: this.state.createPostImage
    })

    this.props.actions.getPosts()
  }

  handleChange (key) {
    return (e) => this.setState({ [key]: e.target.value })
  }

  render () {
    const posts = this.props.app.posts
      ? this.props.app.posts.map((p) => <Post key={p.id} {...p}/>)
      : null

    return <div>
      <Nav />
      <Container>
        <div className='ui container'>
          <input value={this.state.createPostText} onChange={::this.handleChange('createPostText')} />
          <button className='ui button' onClick={::this.createPost}>Create Post!</button>
          <button className='ui button'>Upload Image</button>
          {posts}
          <p>Auth: {JSON.stringify(this.props.auth)}</p>
        </div>
      </Container>
    </div>
  }
}
