import React from 'react'

export default function Post ({ author, name, body }) {
  return <div className='ui fluid card'>
    <div className='content'>
      <img className='right floated mini ui image' src={`https://graph.facebook.com/v2.6/${author}/picture?type=square&height=200`} />
      <div className='meta'>{name}</div>
      <div className='description'>{body}</div>
    </div>
  </div>
}
