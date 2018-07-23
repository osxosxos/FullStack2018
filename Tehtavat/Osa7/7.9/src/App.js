import React from 'react'
import Blog from './components/Blog'
import Notice from './components/Notice'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogPostForm from './components/BlogPostForm'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { notify, clear } from './reducers/notificationReducer'
import { allUsers } from './reducers/usersReducer'
import './app.css';

const BlogComments = (props) => {
  const generateId = () => Number((Math.random() * 100000000).toFixed(0))
  return (
    <div>
      <h3>{'comments'}</h3>
      {props.comments.map(comment =>
        <li key={generateId()}>{comment.comment}</li>
      )}
    </div>
  )
}

const BlogCommentForm = (props) => {
  return (
    <div>
      <form onSubmit={props.commentBlog(props.id, props.newBlogComment)}>
        <div>
          <input
            type="text"
            name="newBlogComment"
            value={props.newBlogComment}
            onChange={props.handleFieldChange}
          />
          <button type="submit">{'Send'}</button>
        </div>
      </form>
    </div>
  )
}

const Users = (props) => {
  console.log(props.users)
  props.users.map(user => console.log(user))
  props.users.map(user => console.log(user['blogs']))
  props.users.map(user => console.log(user.blogs))
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
  console.log('HELLO FROM USER!')
  console.log('PROPS.USERS')
  console.log(props.user)
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

const SingleBlog = (props) => {

  if (props.blog === undefined) {
    props.history.push('/blogs')
  } else if (props.blog.user.username === props.stateUserName) {
    return (
      <div>
        <h2>{props.blog.title}</h2>
        <div>{props.blog.url}</div>
        <div>
          {props.blog.likes}{' likes'}
          <button onClick={props.likeBlog(props.blog.id)}>
            {'like'}
          </button>
        </div>
        <div>
          {'added by '}{props.blog.author}
          <button onClick={props.removeBlog(props.blog.id)}>
            {'delete'}
          </button>
        </div>
        <BlogComments
          comments={props.blog.comments}
        />
        <BlogCommentForm
          id={props.blog.id}
          newBlogComment={props.newBlogComment}
          handleFieldChange={props.handleFieldChange}
          commentBlog={props.commentBlog}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>{props.blog.title}</h2>
        <div>{props.blog.url}</div>
        <div>
          {props.blog.likes}{' likes'}
          <button onClick={props.likeBlog(props.blog.id)}>
            {'like'}
          </button>
        </div>
        <div>{'added by '}{props.blog.author}</div>
        <BlogComments
          comments={props.blog.comments}
        />
        <BlogCommentForm
          id={props.blog.id}
          newBlogComment={props.newBlogComment}
          handleFieldChange={props.handleFieldChange}
          commentBlog={props.commentBlog}
        />
      </div>
    )
  }
  return null
}

const Blogs = (props) => {
  return (
    <div>
      <h2>Blogs</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id}
          title={blog.title}
          author={blog.author}
          id={blog.id}
        />
      )}
    </div>
  )
}

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
      newBlogComment: '',
      blogs: []
    }
  }

  componentWillMount = async () => {

    const { store } = this.context
    this.unsubscribe = store.subscribe(() => this.forceUpdate())

    const blogs = await blogService.getAll()
    this.setState({ blogs: blogs })
    this.sortBlogsByLikes()

    const users = await userService.getAll()
    this.context.store.dispatch(allUsers(users))
    console.log(users)
    users.map(user => console.log(user.blogs))
    users.map(user => console.log(user['blogs']))

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
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
        this.context.store.dispatch(notify('Blog successfully added!'))
        setTimeout(() => { this.context.store.dispatch(clear()) }, 5000)
      })
  }

  likeBlog = (id) => {

    return () => {

      const blog = this.state.blogs.find(blog => blog.id === id)
      const updatedBlog = { ...blog, likes: blog.likes + 1 }

      blogService
        .like(id, updatedBlog)
        .catch(error => {
          this.context.store.dispatch(notify('blog has already been removed from server'))
          setTimeout(() => { this.context.store.dispatch(clear()) }, 5000)
        })
      this.setState({
        blogs: this.state.blogs.map(blog => blog.id !== id ? blog : updatedBlog)
      })
    }
  }

  commentBlog = (id, comment) => {
    return () => {
      blogService
        .comment(id, comment)
        .catch(error => {
          this.context.store.dispatch(notify('blog has already been removed from server'))
          setTimeout(() => { this.context.store.dispatch(clear()) }, 5000)
          this.setState({
            blogs: this.state.blogs.filter(blog => blog.id !== id)
          })
        })

      const blog = this.state.blogs.find(blog => blog.id === id)
      const newComment = { comment: comment }
      const comments = { ...blog.comments.concat(newComment) }
      const commentedBlog = { ...blog, comments: comments }
      this.setState({ blog: commentedBlog })
    }
  }

  removeBlog = (id) => {
    return async () => {
      const deletion = await blogService.remove(id)
      this.context.store.dispatch(notify('Blog successfully deleted!'))
      setTimeout(() => { this.context.store.dispatch(clear()) }, 5000)
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
      this.context.store.dispatch(notify('wrong username or password'))
      setTimeout(() => { this.context.store.dispatch(clear()) }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    this.setState({ user: null })
  }

  componentWillUnmount() {
    this.unsubscribe()
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

    const userById = (id) => {
      return this.context.store.getState().users.find(user => user.id === id)
    }

    const blogById = (id) => {
      return this.state.blogs.find(blog => blog.id === id)
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
                  blogs={this.state.blogs}
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