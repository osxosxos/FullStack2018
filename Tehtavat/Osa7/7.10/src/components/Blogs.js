import React from 'react'
import Blog from './Blog'

const Blogs = (props) => {
    console.log('Hello from Blogs')
    console.log('props are: ')
    console.log(props)
    return (
        <div>
            <h2>Blogs</h2>
            {props.blogs.map(blog =>
                <Blog key={blog.id}
                    title={blog.title}
                    author={blog.author}
                    id={blog.id}
                />
            )}
        </div>
    )
}

export default Blogs