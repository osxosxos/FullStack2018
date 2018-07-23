import React from 'react'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import Notice from './components/Notice'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogPostForm from './components/BlogPostForm'
import SingleBlog from './components/SingleBlog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { notify, clear } from './reducers/notificationReducer'
import { allUsers } from './reducers/usersReducer'
import { allBlogs, createBlog, updateBlog, deleteBlog } from './reducers/blogsReducer'
import './app.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      username: '',
      password: '',
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      newBlogComment: ''
    }
  }

  componentWillMount = async () => {

    const { store } = this.context
    this.unsubscribe = store.subscribe(() => this.forceUpdate())

    const blogs = await blogService.getAll()
    this.context.store.dispatch(allBlogs(blogs))
    console.log('Hello from component did mount')
    console.log('blogs are:')
    console.log(blogs)
    //this.sortBlogsByLikes()

    const users = await userService.getAll()
    this.context.store.dispatch(allUsers(users))

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl
    }

    const blog = await blogService.create(blogObject)
    this.context.store.dispatch(createBlog(blog))
    this.setState({ newBlogTitle: '', newBlogAuthor: '', newBlogUrl: '' })
    this.context.store.dispatch(notify('Blog successfully added!'))
    setTimeout(() => { this.context.store.dispatch(clear()) }, 5000)
  }

  likeBlog = async (id) => {
    const blog = this.context.store.getState().find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const likedBlog = await blogService.like(id, updatedBlog)
    this.context.store.dispatch(updateBlog(likedBlog))
    console.log(likedBlog)
  }

  commentBlog = async (id, comment) => {
    const blog = this.context.store.getState().find(blog => blog.id === id)
    const blogComment = await blogService.comment(id, comment)
    const commentedBlog = { ...blog, comments: blog.comments.concat(comment) }
    this.context.store.dispatch(updateBlog(commentedBlog))
    console.log(blogComment)
  }

  removeBlog = async (id) => {
    const deletedBlog = await blogService.remove(id)
    this.context.store.dispatch(notify('Blog successfully deleted!'))
    this.context.store.dispatch(deleteBlog(id))
    console.log(deletedBlog)
  }

  // ÄLÄ TEE TÄLLE VIELÄ MITÄÄN!
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.context.store.dispatch(notify('wrong username or password'))
      setTimeout(() => { this.context.store.dispatch(clear()) }, 5000)
    }
  }

  // ÄLÄ TEE TÄLLE VIELÄ MITÄÄN!
  logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    this.setState({ user: null })
  }

  // TÄMÄ ON KUNNOSSA!
  sortBlogsByLikes() {
    let copy = []
    for (var i = 0; i < this.context.store.getState().blogs.length; i++) {
      copy.push(this.context.store.getState().blogs[i])
    }
    copy.sort(function (blogA, blogB) {
      return blogB.likes - blogA.likes;
    });
    console.log('sortByLikes')
    this.context.store.dispatch(allBlogs(copy))
  }

  render() {
  
    console.log('Hello from render')
    console.log('here is a list of store.getState().blogs:')
    console.log(this.context.store.getState().blogs)

    const userById = (id) => {
      return this.context.store.getState().users.find(user => user.id === id)
    }

    const blogById = (id) => {
      return this.context.store.getState().blogs.find(blog => blog.id === id)
    }

    if (this.state.user === null) {
      return (
        <div>
          <div>
            <LoginForm
              state={this.state}
              login={this.login}
              handleFieldChange={this.handleFieldChange}
            />
          </div>
          <div>
            <Notice
              message={this.context.store.getState().notification}
              classname='error'
            />
          </div>
        </div >
      )
    }

    if (this.state.user !== null) {
      return (
        <div>
          <div>
            <LogoutForm
              state={this.state}
              logout={this.logout}
            />
          </div>
          <div>
            <Notice
              message={this.context.store.getState().notification}
              classname='notice'
            />
          </div>
          <Router>
            <div>
              <div>
                <Link to="/create">{'create'}</Link>
                <Link to="/blogs">{'blogs'}</Link>
                <Link to="/users">{'users'}</Link>
              </div>
              <Route exact path="/create" render={() =>
                <BlogPostForm
                  state={this.state}
                  addBlog={this.addBlog}
                  handleFieldChange={this.handleFieldChange}
                />}
              />
              <Route exact path="/blogs" render={() =>
                <Blogs
                  blogs={this.context.store.getState().blogs}
                />}
              />
              <Route exact path="/users" render={() =>
                <Users
                  users={this.context.store.getState().users}
                />}
              />
              <Route exact path="/users/:id" render={({ match }) =>
                <User
                  user={userById(match.params.id)}
                />}
              />
              <Route exapt path="/blogs/:id" render={({ history, match }) =>
                <SingleBlog
                  blog={blogById(match.params.id)}
                  likeBlog={this.likeBlog}
                  removeBlog={this.removeBlog}
                  stateUserName={this.state.user.username}
                  history={history}
                  newBlogComment={this.state.newBlogComment}
                  handleFieldChange={this.handleFieldChange}
                  commentBlog={this.commentBlog}
                />}
              />
            </div>
          </Router>
        </div>
      )
    }
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default App;