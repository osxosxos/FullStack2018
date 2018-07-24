import React from 'react'
import BlogCommentForm from './BlogCommentForm'
import BlogComments from './BlogComments'

const SingleBlog = (props) => {
    if (props.blog === undefined) {
        props.history.push('/blogs')
    } else if (props.blog.user.username === props.stateUserName) {
        return (
            <div>
                <h2>{props.blog.title}</h2>
                <div>{props.blog.url}</div>
                <div>
                    {props.blog.likes}{' likes'}
                    <button onClick={props.likeBlog(props.blog.id)}>
                        {'like'}
                    </button>
                </div>
                <div>
                    {'added by '}{props.blog.author}
                    <button onClick={props.removeBlog(props.blog.id)}>
                        {'delete'}
                    </button>
                </div>
                <BlogComments
                    comments={props.blog.comments}
                />
                <BlogCommentForm
                    id={props.blog.id}
                    newBlogComment={props.newBlogComment}
                    handleFieldChange={props.handleFieldChange}
                    commentBlog={props.commentBlog}
                />
            </div>
        )
    } else {
        return (
            <div>
                <h2>{props.blog.title}</h2>
                <div>{props.blog.url}</div>
                <div>
                    {props.blog.likes}{' likes'}
                    <button onClick={props.likeBlog(props.blog.id)}>
                        {'like'}
                    </button>
                </div>
                <div>{'added by '}{props.blog.author}</div>
                <BlogComments
                    comments={props.blog.comments}
                />
                <BlogCommentForm
                    id={props.blog.id}
                    newBlogComment={props.newBlogComment}
                    handleFieldChange={props.handleFieldChange}
                    commentBlog={props.commentBlog}
                />
            </div>
        )
    }
    return null
}

export default SingleBlog