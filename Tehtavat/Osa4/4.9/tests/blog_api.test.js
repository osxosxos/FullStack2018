const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Pertin musablogi",
    author: "Pertti Keinonen",
    url: "www.pertinmusablogi.com",
    likes: "666"
  },
  {
    title: "Feminist Frequency",
    author: "Anita Sarkeesian",
    url: "www.feministfrequency.com",
    likes: "4193432732746284636"
  }
]

beforeAll(async () => {
  await Blog.remove({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

test('the name of the first blog is Pertin musablogi', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('Pertin musablogi')
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "Sakarin musablogi",
    author: "Sakari Östermalm",
    url: "www.sakarinmusablogi.com",
    likes: "333"
  }

  await api
    .post('/api/blogs')
    .send(newBlog).expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(blog => blog.title)

  expect(response.body.length).toBe(3)
  expect(contents).toContain('Sakarin musablogi')
})

afterAll(() => {
  server.close()
})