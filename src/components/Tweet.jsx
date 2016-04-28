import React from 'react'

export default function Tweet ({ avatar, name, body }) {
  return <div className='ui fluid card'>
    <div className='content'>
      <img className='left floated mini ui circular image' src={avatar} />
      <span className='right floated'><i className='twitter icon'></i></span>
      <div className='meta'>{name}</div>
      <div className='description'>{body}</div>
    </div>
  </div>
}
