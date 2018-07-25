import React from 'react'

const User = (props) => {
    const blogs = []
    props.user.blogs.map(blog => blogs.push({ id: blog._id, title: blog.title }))
    return (
        <div>
            <h1>{props.user.name}</h1>
            <h2>{'added blogs'}</h2>
            {blogs.map(blog =>
                <div key={blog.id}>
                    <li>{blog.title}</li>
                </div>
            )}
        </div>
    )
}

export default User