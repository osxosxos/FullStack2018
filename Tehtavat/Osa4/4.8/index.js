const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

mongoose.connect(config.mongoUrl).then(() => {
    console.log('connected to database: ', config.mongoUrl)
}).catch(error => { console.log('error: ', error) })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
    mongoose.connection.close()
})

module.exports = {
    app, server
}

