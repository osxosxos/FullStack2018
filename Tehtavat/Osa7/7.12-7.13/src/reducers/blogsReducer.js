const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ALLBLOGS':
            return action.data
        case 'CREATE':
            return state.concat(action.newBlog)
        case 'UPDATE':
            return state.map(blog => blog.id !== action.updatedBlog.id ? blog : action.updatedBlog)
        case 'DELETE':
            return state.filter(blog => blog.id !== action.blogId)
        default:
            return state
    }
}

export const allBlogs = (blogs) => {
    return ({
        type: 'ALLBLOGS',
        data: blogs
    })
}

export const createBlog = (blog) => {
    return ({
        type: 'CREATE',
        newBlog: blog
    })
}

export const deleteBlog = (id) => {
    return ({
        type: 'DELETE',
        blogId: id
    })
}

export const updateBlog = (blog) => {
    return ({
        type: 'UPDATE',
        updatedBlog: blog
    })
}

export default blogsReducer