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

module.exports = {
    dummy, totalLikes, favoriteBlog
}