import React from 'react'

//Recieves Post ID and retrieves it from rethinkDB.
//author is actually the ID in the database.
export default function Post ({ author, body, id, imgPath }) {
  return <div className='ui card'>
    <p>Author: {author}</p>
    <img src={imgPath}/>
  <p>{body}</p>
  </div>
}
