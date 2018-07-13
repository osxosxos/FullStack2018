import React from 'react'
import { connect } from 'react-redux'
import { creation } from './../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.creation(event.target.anecdote.value)
    event.target.anecdote.value = ''
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