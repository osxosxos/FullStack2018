const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.json())

const url = 'mongodb://abc:abc123@ds263740.mlab.com:63740/testblogs'
mongoose.connect(url)

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number
})

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => {response.json(blogs)})
})


app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
    blog.save().then(result => {response.status(201).json(result)})
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

