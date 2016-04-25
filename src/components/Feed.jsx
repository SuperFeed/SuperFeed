import React from 'react'
import Post from './Post'

export default function Feed ({ user, posts, onLike, onComment }) {
  const feedStyles = {
    paddingTop: '1rem'
  }

  return <div style={feedStyles}>
    {posts.map((post) => <Post key={post.id} onLike={onLike} onComment={onComment} user={user} {...post} />)}
  </div>
}
