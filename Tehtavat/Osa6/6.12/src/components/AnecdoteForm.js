import React from 'react'
import { connect } from 'react-redux'
import { creation } from './../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {

  handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(content)
    this.props.creation(newAnecdote)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const ConnectedAnecdoteForm = connect(
  null, { creation }
)(AnecdoteForm)

export default ConnectedAnecdoteForm