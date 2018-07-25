import React from 'react'
import { Link } from 'react-router-dom'

const Blog = (props) => {
  return (
    <div>
      <Link to={`/blogs/${props.id}`}>{props.title} </Link>{props.author}
    </div >
  )
}

export default Blog