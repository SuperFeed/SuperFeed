import React, { Component } from 'react'
import { connect } from 'react-redux'
import re, { selector } from './actions'
import { SF_API } from './api'
import { NavItem, BottomNav, NavContainer } from './components/Nav'
import Feed from './components/Feed'
import CreatePostForm from './components/CreatePostForm'

@connect(selector, re.action)
export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: [],
      loading: true,
      focus: false
    }
  }

  async createPost (body) {
    await SF_API.post('createPost', {
      body,
      author: this.props.auth.id,
      accessToken: this.props.auth.accessToken
    })

    this.props.actions.getPosts()
  }

  async likePost (id, liked) {
    await SF_API.post(!liked ? 'likePost' : 'unlikePost', {
      user: this.props.auth.id,
      accessToken: this.props.auth.accessToken,
      post: id
    })

    this.props.actions.getPosts()
  }

  async createComment (id, body) {
    await SF_API.post('createComment', {
      author: this.props.auth.id,
      accessToken: this.props.auth.accessToken,
      post: id,
      body
    })

    this.props.actions.getPosts()
  }

  focusInput () {
    this.refs.body.scrollIntoView()
  }

  render () {
    return <div ref='body'>
      <NavContainer>
        <div className='ui text container'>
          <CreatePostForm onSubmit={::this.createPost} />
          <Feed user={this.props.auth.id} posts={this.props.app.posts} onLike={::this.likePost} onComment={::this.createComment} />
        </div>
      </NavContainer>
      <BottomNav>
        <NavItem onClick={::this.focusInput}><i className='large write icon' /></NavItem>
        <NavItem><i className='large settings icon' /></NavItem>
      </BottomNav>
    </div>
  }
}
