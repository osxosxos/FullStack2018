import React from 'react'

const BlogComments = (props) => {
    const generateId = () => Number((Math.random() * 100000000).toFixed(0))
    return (
        <div>
            <h3>{'comments'}</h3>
            {props.comments.map(comment =>
                <li key={generateId()}>{comment.comment}</li>
            )}
        </div>
    )
}

export default BlogComments