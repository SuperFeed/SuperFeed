import React from 'react'

export default function Insta ({ avatar, name, body, image }) {
  return <div className='ui fluid card' >
    <div className='content'>
      <img className='left floated mini ui circular image' src={avatar} />
      <span className='right floated'><i className='instagram icon'></i></span>
      <div className='meta'>{name}</div>
      <img className='ui rounded image' src={image} />
    </div>
    <div className='extra content'>
      <div className='description'>{body ? body.text : null}</div>
    </div>
  </div>
}
