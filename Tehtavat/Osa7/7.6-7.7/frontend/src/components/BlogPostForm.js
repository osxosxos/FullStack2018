import React from 'react'

const BlogPostForm = (props) => {
    return (
        <div>
            <h2>{'Be a hero? Create awesome new blog!'}</h2>
            <form onSubmit={props.addBlog}>
                <div>
                    {'Title: '}
                    <input
                        type="text"
                        name="newBlogTitle"
                        value={props.state.newBlogTitle}
                        onChange={props.handleFieldChange}
                    />
                </div>
                <div>
                    {'Author: '}
                    <input
                        type="text"
                        name="newBlogAuthor"
                        value={props.state.newBlogAuthor}
                        onChange={props.handleFieldChange}
                    />
                </div>
                <div>
                    {'Url: '}
                    <input
                        type="text"
                        name="newBlogUrl"
                        value={props.state.newBlogUrl}
                        onChange={props.handleFieldChange}
                    />
                </div>
                <button type="submit">{'Send'}</button>
            </form>
        </div>
    )
}

export default BlogPostForm