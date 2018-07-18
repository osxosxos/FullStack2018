import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { voting } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'

const AnecdoteList = (props) => (
  <div>
    <h2>Anecdotes</h2>
    <div><Filter /></div>
    <div>
      {props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div> has {anecdote.votes}
            <button onClick={() => { props.voting(anecdote), props.notify(anecdote.content, 5000) }}>
              {'vote'}
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)

const AnecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: AnecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { voting, notify }
)(AnecdoteList)