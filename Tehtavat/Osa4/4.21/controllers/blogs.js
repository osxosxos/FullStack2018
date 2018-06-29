const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map(Blog.format))
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
    
        const user = await User.findById(request.body.user)

        if (!request.token) {
            return response.status(401).json({ error: 'token missing' })
        }

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (user.id !== decodedToken.id) {
            return response.status(401).json({ error: 'wrong user' })
        }
              
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.post('/', async (request, response) => {
    try {

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if (request.body.title === undefined) {
            return response.status(400).json({ error: 'title missing' })
        }

        if (request.body.url === undefined) {
            return response.status(400).json({ error: 'url missing' })
        }

        const user = await User.findById(request.body.user)

        let blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: user
        })

        if (request.body.likes === undefined) {
            blog.likes = 0
        }

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(Blog.format(blog))

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

blogsRouter.put('/:id', (request, response) => {

    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(formatBlog(updatedBlog))
        })
})

module.exports = blogsRouter