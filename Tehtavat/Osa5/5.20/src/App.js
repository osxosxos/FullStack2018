import React from 'react';

const anecdotesInOrder = (anecdotes) => {
  console.log(anecdotes)
  anecdotes.sort(function (a, b) {
    console.log('a.votes: ', a.votes)
    console.log('b.votes: ', b.votes)
    return b.votes - a.votes;
  });
  console.log(anecdotes)
  return anecdotes
}

class App extends React.Component {

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
        <form>
          <div><input /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App