import React from 'react'

export default function Post ({ author, text }) {
  return <div className='ui card'>
    <p>Author: {author}</p>
    <p>{text}</p>
  </div>
}
