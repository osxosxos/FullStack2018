import React from 'react';

const anecdotesInOrder = (anecdotes) => {
  anecdotes.sort(function (a, b) {
    return b.votes - a.votes;
  });
  return anecdotes
}

class App extends React.Component {

  add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content
      }
    })
    event.target.anecdote.value = ''
  }

  vote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  render() {
    const anecdotes = anecdotesInOrder(this.props.store.getState())
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.add}>
          <input name="anecdote" />
          <button type="submit">{'post'}</button>
        </form>

      </div>
    )
  }
}

export default App