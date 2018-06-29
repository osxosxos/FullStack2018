const { Blog, formatBlog } = require('../models/blog')

const initialBlogs = [
    {
        title: "Pertin musablogi",
        author: "Pertti Keinonen",
        url: "www.pertinmusablogi.com",
        likes: 666
    },
    {
        title: "Feminist Frequency",
        author: "Anita Sarkeesian",
        url: "www.feministfrequency.com",
        likes: 4193432732746284
    }
]

const testBlogs = [
    newBlog = {
        title: "Sakarin musablogi",
        author: "Sakari Östermalm",
        url: "www.sakarinmusablogi.com",
        likes: 333
    },
    blogWithoutLikes = {
        title: "Blogi, josta kukaan ei tykkää",
        author: "Joku",
        url: "www.blogi.com"
    },
    blogWithoutTitle = {
        author: "Tuntematon sotilas",
        url: "www.tuntematon.com",
        likes: 5403
    },
    blogWithoutUrl = {
        title: "Blogi, josta kukaan ei tykkää",
        author: "Joku",
        likes: 2424
    },
    blogToBeAddedAndDeleted = {
        title: "Deletoitava blogi",
        author: "Delete",
        url: "www.deletethis.com",
        likes: 243534
    }
]

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(formatBlog)
}

module.exports = { initialBlogs, testBlogs, blogsInDatabase }

