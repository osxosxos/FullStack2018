import React from 'react'

const BlogCommentForm = (props) => {
    return (
        <div>
            <form onSubmit={props.commentBlog(props.id, props.newBlogComment)}>
                <div>
                    <input
                        type="text"
                        name="newBlogComment"
                        value={props.newBlogComment}
                        onChange={props.handleFieldChange}
                    />
                    <button type="submit">{'Send'}</button>
                </div>
            </form>
        </div>
    )
}

export default BlogCommentForm