import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      error: null,
      username: '',
      password: '',
      blogs: []
    }
  }

  handleLoginFieldChange = (event) => {
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    this.setState({ user: null })
    window.localStorage.clear()
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
    }
  
  }

  render() {

    if (this.state.user === null) {
      return (
        <div>
          <LoginForm
            state={this.state}
            login={this.login}
            handleLoginFieldChange={this.handleLoginFieldChange}
          />
          <h3>{this.state.error}</h3>
        </div>
      )
    }

    if (this.state.user !== null) {
      return (
        <div>
          <LogoutForm
            state={this.state}
            logout={this.logout}
          />
          <h2>Blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )
    }

  }
}

export default App;
