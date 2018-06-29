const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => { response.json(blogs.map(formatBlog)) })
})

blogsRouter.post('/', (request, response) => {

    let blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    })

    if (request.body.likes === undefined) {
        blog.likes = 0
    }

    blog.save().then(blog => {
        return formatBlog(blog)
    }).then(formattedBlog => {
        response.json(formattedBlog)
    })
})

module.exports = blogsRouter