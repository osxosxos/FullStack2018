import React from 'react'
import { Container, Grid, GridColumn, Menu, Message, Form, Button } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
            <Table.Cell>
              {anecdote.author}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <Table striped celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <h2>{anecdote.content}</h2>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <div>{'Author: '}{anecdote.author} </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <div>{'Votes: '}{anecdote.votes}</div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <div>{'Info: '}{anecdote.info} </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

const Notification = ({ notification }) => {
  if (notification !== '') {
    return (
      <Message success>
        {notification}
      </Message>
    )
  }
  return null
}

const LinkMenu = ({ }) => {
  return (
    <Menu inverted>
      <Menu.Item link>
        <Link to="/">anecdotes</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/create">create new</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/about">about</Link>
      </Menu.Item>
    </Menu>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
      <GridColumn width={12}>
        <p>According to Wikipedia:</p>
        <em>
          An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
          An anecdote is "a story with a point."
        </em>
        <p></p>
        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        <p></p>
      </GridColumn>
      <GridColumn width={4} height={4}>
        <img src="http://www.historyrevealed.com/sites/default/files/imagecache/623px_wide/GettyImages-90771986%20copy_0.jpg" className="ui image" />
      </GridColumn>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content:</label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>author:</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button type='submit'>create</Button>
        </Form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({ notification: 'New anecdote "' + anecdote.content + '" has been succesfully created' })
    setTimeout(() => this.setState({ notification: '' }), 10000);
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)
    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <h1>Software anecdotes</h1>
        <Notification notification={this.state.notification} />
        <Router>
          <div>
            <LinkMenu />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/create" render={({ history }) => <CreateNew
              addNew={this.addNew}
              history={history} />}
            />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;