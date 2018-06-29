const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { Blog } = require('../models/blog')
const { initialBlogs, testBlogs, blogsInDatabase } = require('./tests_helper')

describe('when there is initially some blogs saved', async () => {

  beforeAll(async () => {
    await Blog.remove({})
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObjects.map(blog => blog.save()))
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

  describe('addition of a new blog', async () => {

    test('a valid blog can be added ', async () => {

      await api
        .post('/api/blogs')
        .send(testBlogs[0]).expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const contents = response.body.map(blog => blog.title)

      expect(response.body.length).toBe(3)
      expect(contents).toContain('Sakarin musablogi')
    })

    test('if blog likes are undefined, will post blog with 0 likes', async () => {

      await api
        .post('/api/blogs')
        .send(testBlogs[1])
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      expect(response.body[3].likes).toBe(0)
    })

    test('blog without title is not added ', async () => {

      await api
        .post('/api/blogs')
        .send(testBlogs[2])
        .expect(400)

      const response = await api
        .get('/api/blogs')

      expect(response.body.length).toBe(4)
    })

    test('blog without url is not added ', async () => {

      await api
        .post('/api/blogs')
        .send(testBlogs[3])
        .expect(400)

      const response = await api
        .get('/api/blogs')

      expect(response.body.length).toBe(4)
    })

  })

  describe('deletion of a blog works', async () => {

    let blogToBeAdded

    beforeAll(async () => {
      blogToBeAdded = new Blog(testBlogs[4])
      await blogToBeAdded.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
      const blogsAtStart = await blogsInDatabase()

      await api
        .delete(`/api/blogs/${blogToBeAdded._id}`)
        .expect(204)

      const blogsAfterOperation = await blogsInDatabase()

      const contents = blogsAfterOperation.map(blog => blog.title)

      expect(contents).not.toContain(blogToBeAdded.title)
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
    })

  })

  describe('update of a blog works', async () => {

    let blogToBeUpdated = new Blog(testBlogs[4])

    beforeAll(async () => {
      await blogToBeUpdated.save()
    })

    test('PUT /api/blogs/:id succeeds with proper statuscode', async () => {

      const blogsBeforeOperation = await blogsInDatabase()
      const blogToBeUpdatedTitle = blogToBeUpdated.title
      const likesBeforeUpdate = blogToBeUpdated.likes

      blogToBeUpdated = blogsBeforeOperation.find(blog => blog.title === blogToBeUpdatedTitle)
      blogToBeUpdated.likes = blogToBeUpdated.likes + 1

      await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .send(blogToBeUpdated)
        .expect(200)

      const blogsAfterOperation = await blogsInDatabase()
      const updatedBlog = blogsAfterOperation.find(blog => blog.title === blogToBeUpdatedTitle)
      const updatedBlogLikes = updatedBlog.likes
      
      expect(updatedBlogLikes).toBe(likesBeforeUpdate + 1)
    })

  })

  afterAll(() => {
    server.close()
  })

})
