const mongoose = require('mongoose')

const url = 'mongodb://abc:abc123@ds263740.mlab.com:63740/testblogs'

mongoose.connect(url)

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = Blog
