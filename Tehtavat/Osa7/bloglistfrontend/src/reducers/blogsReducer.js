const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ALL':
            console.log('Hello from blogReducer')
            console.log('action.data is:')
            console.log(action.data)
            return action.data
        case 'CREATE':
            return state.concat(action.newBlog)
        case 'UPDATE':
            return state.map(blog => blog._id === action.id ? blog : action.updatedBlog)
        case 'DELETE':
            return state.filter(blog => blog._id !== action.blogId)
        default:
            return state
    }
}

export const allBlogs = (blogs) => {
    return ({
        type: 'ALL',
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