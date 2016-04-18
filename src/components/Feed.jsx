import React from 'react'
import Post from './Post'

export default function Feed ({ posts }) {
  const feedStyles = {
    paddingTop: '1rem'
  }

  return <div style={feedStyles}>
    {posts.map((post) => <Post key={post.id} {...post} />)}
  </div>
}
