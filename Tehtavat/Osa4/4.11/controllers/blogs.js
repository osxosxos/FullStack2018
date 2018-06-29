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

    if (request.body.title === undefined) {
        return response.status(400).json({ error: 'title missing' })
    }

    if (request.body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
    }

    blog.save().then(blog => {
        return formatBlog(blog)
    }).then(formattedBlog => {
        response.json(formattedBlog)
    })
})

module.exports = blogsRouter