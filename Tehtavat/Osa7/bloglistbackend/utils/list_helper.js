const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let favoriteBlog = blogs[0]
    for (var i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > favoriteBlog.likes) {
            favoriteBlog = blogs[i]
        }
    }
    return favoriteBlog
}

const mostBlogs = (blogs) => {

    let authors = []

    for (var i = 0; i < blogs.length; i++) {
        authorName = blogs[i].author
        if (!authors.find(author => author.name === authorName)) {
            let author = {
                name: blogs[i].author,
                blogs: 1
            }
            authors.push(author)
        } else {
            let author = authors.find(blogAuthor => blogAuthor.name === authorName)
            author.blogs = author.blogs + 1
        }
    }

    let authorWithMostBlogs = authors[0]

    for (var i = 0; i < authors.length; i++) {
        if (authors[i].blogs > authorWithMostBlogs.blogs) {
            authorWithMostBlogs = authors[i]
        }
    }

    return authorWithMostBlogs
}

const mostLikes = (blogs) => {

    let authors = []

    for (var i = 0; i < blogs.length; i++) {
        authorName = blogs[i].author
        if (!authors.find(author => author.name === authorName)) {
            let author = {
                name: blogs[i].author,
                likes: blogs[i].likes
            }
            authors.push(author)
        } else {
            let author = authors.find(blogAuthor => blogAuthor.name === authorName)
            author.likes = author.likes + blogs[i].likes
        }
    }

    let authorWithMostLikes = authors[0]

    for (var i = 0; i < authors.length; i++) {
        if (authors[i].likes > authorWithMostLikes.likes) {
            authorWithMostLikes = authors[i]
        }
    }

    return authorWithMostLikes

}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }