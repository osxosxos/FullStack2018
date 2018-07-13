import React from 'react'
import Filter from './Filter'
import PropTypes from 'prop-types'
import { voting } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'
import { notificationDeletion } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const anecdotes = this.context.store.getState().anecdotes
    const filter = this.context.store.getState().filter.toLowerCase()
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
                this.context.store.dispatch(voting(anecdote.id)),
                  this.context.store.dispatch(notificationChange(anecdote.content)),
                  setTimeout(() => { this.context.store.dispatch(notificationDeletion()) }, 5000)
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

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
