import React from 'react'

export default function Post ({ user, id, author, name, body, likes, onLike, onComment }) {
  return <div className='ui fluid card'>
    <div className='content'>
      <img className='right floated mini ui image' src={`https://graph.facebook.com/v2.6/${author}/picture?type=square&height=200`} />
      <span className="right floated">
        <i className={`${likes.includes(user) ? 'active' : ''} like icon`} onClick={() => onLike(id)}></i>
        {likes.length}
      </span>
      <div className='meta'>{name}</div>
      <div className='description'>{body}</div>
    </div>
    <div className="extra content">
      <div className="ui large transparent left icon input">
        <i className="comment outline icon"></i>
        <input style={{ fontSize: 16 }} type="text" placeholder="Add Comment..." />
      </div>
    </div>
  </div>
}
