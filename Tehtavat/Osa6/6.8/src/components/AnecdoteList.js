import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { voting } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'
import { notificationDeletion } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  render() {
    const anecdotes = this.props.anecdotes
    const filter = this.props.filter.toLowerCase()
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    return (
      <div>
        <h2>Anecdotes</h2>
        <div>
          <Filter />
        </div>
        {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.voting(anecdote.id),
                  this.props.notificationChange(anecdote.content),
                  setTimeout(() => { this.props.notificationDeletion() }, 5000)
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const ConnectedAnecdoteList= connect(
  mapStateToProps, { voting, notificationChange, notificationDeletion }
)(AnecdoteList)

export default ConnectedAnecdoteList
