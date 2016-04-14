import React from 'react'

export default function Post ({ author, text, imgPath }) {
  return <div className='ui card'>
    <p>Author: {author}</p>
    <img src={imgPath}/>
    <p>{text}</p>
  </div>
}
