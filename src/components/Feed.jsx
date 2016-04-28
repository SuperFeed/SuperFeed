import React from 'react'
import Post from './Post'
import Tweet from './Tweet'
import Insta from './Insta'

export default function Feed ({ user, posts, onLike, onComment }) {
  const feedStyles = {
    paddingTop: '1rem'
  }

  return <div style={feedStyles}>
    {posts.map((post) => {
      if (!post.type) {
        return <Post key={post.id} onLike={onLike} onComment={onComment} user={user} {...post} />
      } else if (post.type === 'twitter') {
        return <Tweet key={'twitter' + post.id} {...post} />
      } else if (post.type === 'instagram') {
        return <Insta key={'instagram' + post.id} {...post} />
      }
      return null
    })}
  </div>
}
