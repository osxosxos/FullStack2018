import React from 'react'
import Blog from './components/Blog'
import Notice from './components/Notice'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogPostForm from './components/BlogPostForm'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './app.css';

const Users = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const User = (props) => {
  const blogs = []
  props.user.blogs.map(blog => blogs.push({ id: blog._id, title: blog.title }))
  return (
    <div>
      <h1>{props.user.name}</h1>
      <h2>{'added blogs'}</h2>
      {blogs.map(blog =>
        <div key={blog.id}>
          <li>{blog.title}</li>
        </div>
      )}
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      error: null,
      notice: null,
      username: '',
      password: '',
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      blogs: [],
      users: []
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl
    }

    blogService
      .create(blogObject)
      .then(blogObject => {
        this.setState({
          blogs: this.state.blogs.concat(blogObject),
          newBlogTitle: '',
          newBlogAuthor: '',
          newBlogUrl: ''
        })

        if (blogObject.title !== '' && blogObject.author !== '' && blogObject.url !== '') {
          this.setState({ notice: 'Blog successfully added!' })
          setTimeout(() => {
            this.setState({ notice: null })
          }, 5000)
        }
      })
  }

  likeBlog = (id) => {

    return () => {

      const blog = this.state.blogs.find(blog => blog.id === id)
      const updatedBlog = { ...blog, likes: blog.likes + 1 }

      blogService
        .like(id, updatedBlog)
        .catch(error => {
          this.setState({
            error: ` blog '${updatedBlog.title}' has already been removed from server`,
            blogs: this.state.blogs.filter(blog => blog.id !== id)
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 50000)
        })
      this.setState({
        blogs: this.state.blogs.map(blog => blog.id !== id ? blog : updatedBlog)
      })
    }
  }

  removeBlog = (id) => {

    return () => {

      blogService
        .remove(id)
        .catch(error => {
          error: 'blog has already been removed from server',
            this.state.blogs.filter(blog => blog.id !== id)
        })
      setTimeout(() => {
        this.setState({ error: null })
      }, 50000)
      this.setState({
        blogs: this.state.blogs.filter(blog => blog.id !== id)
      })
    }
  }

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
      this.setState({
        error: 'wrong username or password'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    this.setState({ user: null })
  }

  componentDidMount = async () => {

    const blogs = await blogService.getAll()
    this.setState({ blogs: blogs })
    this.sortBlogsByLikes()

    const users = await userService.getAll()
    console.log('componentDidMount.users')
    console.log(users)
    this.setState({ users: users })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }

  }

  sortBlogsByLikes() {
    let copy = []

    for (var i = 0; i < this.state.blogs.length; i++) {
      copy.push(this.state.blogs[i])
    }

    copy.sort(function (blogA, blogB) {
      return blogB.likes - blogA.likes;
    });
    this.setState({ blogs: copy })
  }

  render() {

    this.componentDidMount

    const userById = (id) => {
      console.log(this.state.users)
      console.log(id)
      console.log(this.state.users.find(user => user.id = id))
      return this.state.users.find(user => user.id = id)
    }

    const blogPostForm = () => (
      <Togglable buttonLabel="Create" ref={component => this.blogPostForm = component}>
        <BlogPostForm
          state={this.state}
          addBlog={this.addBlog}
          handleFieldChange={this.handleFieldChange}
        />
      </Togglable>
    )

    if (this.state.user === null) {
      return (
        <div>
          <div className="LoginForm">
            <LoginForm
              state={this.state}
              login={this.login}
              handleFieldChange={this.handleFieldChange}
            />
          </div>
          <div>
            <Notice
              message={this.state.error}
              classname='error'
            />
          </div>
        </div >
      )
    }

    if (this.state.user !== null) {
      return (
        <div>
          <div className="LogoutForm">
            <LogoutForm
              state={this.state}
              logout={this.logout}
            />
          </div>
          <div>
            <h2>Blogs</h2>
            {this.state.blogs.map(blog =>
              <Blog key={blog.id}
                blogUserName={blog.user.username}
                stateUserName={this.state.user.username}
                title={blog.title}
                author={blog.author}
                likes={blog.likes}
                url={blog.url}
                name={blog.user.name}
                id={blog.id}
                likeBlog={this.likeBlog}
                removeBlog={this.removeBlog}
              />
            )}
          </div>
          <div className="BlogPostForm">
            <h2>{'Be a Hero? Create a new blog!'}</h2>
            {blogPostForm()}
            <Notice
              message={this.state.notice}
              classname='notice'
            />
          </div>
          <Router>
            <div>
              <Route exact path="/users" render={() => <Users users={this.state.users} />} />
              <Route exact path="/users/:id" render={({ match }) => <User user={userById(match.params.id)} />} />
            </div>
          </Router>
        </div>
      )
    }

  }
}

export default App;
