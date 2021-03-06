import React from 'react'
import Filter from './Filter'
import { voting } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'
import { notificationDeletion } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    const filter = this.props.store.getState().filter
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
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
                this.props.store.dispatch(voting(anecdote.id)),
                  this.props.store.dispatch(notificationChange(anecdote.content)),
                  setTimeout(() => { this.props.store.dispatch(notificationDeletion()) }, 5000)
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

export default AnecdoteList
