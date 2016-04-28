import React, { Component } from 'react'

export default class Post extends Component {
  constructor (props) {
    super(props)

    this.state = {
      input: ''
    }
  }

  handleChange (e) {
    this.setState({ input: e.target.value })
  }

  onLike () {
    this.props.onLike(this.props.id, this.props.likes.includes(this.props.user))
  }

  onComment () {
    this.props.onComment(this.props.id, this.state.input)
    this.setState({ input: '' })
  }

  render () {
    const { user, author, name, body, likes, comments, imgPath } = this.props

    const liked = likes.includes(user)

    return <div className='ui fluid card'>
      <div className='content'>
        <img className='left floated mini ui circular image' src={`https://graph.facebook.com/v2.6/${author}/picture?type=square&height=200`} />
        <span className='right floated'>
          <i className={`${liked ? 'active' : ''} like icon`} onClick={::this.onLike}></i>
          {likes.length}
        </span>
        <div className='meta'>{name}</div>
        {imgPath ? <img className='image ui' src={imgPath}/> : ''}
        <div className='description'>{body}</div>
      </div>
      {!comments.length ? null : <div className='extra content'>
        <div className='ui feed'>
          {comments.map((c) =>
            <div className='event' key={c.body}>
              <div className='label'><img src={`https://graph.facebook.com/v2.6/${c.author}/picture?type=square&height=200`} /></div>
              <div className='content'>
                <span className='summary' style={{ paddingRight: '.5rem' }}>
                  <span className='meta user'>{c.name}</span>
                </span>
                <span className='extra text'>
                  {c.body}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>}
      <div className='extra content'>
        <div className='ui large transparent left icon input' style={{ width: '100%' }}>
          <i className='comment outline icon'></i>
          <input style={{ fontSize: 16 }} type='text' placeholder='Add Comment...' value={this.state.input} onChange={::this.handleChange} />
          {this.state.input === ''
            ? null
            : <span className='right floated'><i className='share icon' onClick={::this.onComment}></i></span>
          }
        </div>
      </div>
    </div>
  }
}
