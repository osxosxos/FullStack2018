import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return [...store, action.content]
    case 'INIT':
      return action.data
    case 'VOTE':
      const old = store.filter(a => a.id !== action.data.id)
      const voted = store.find(a => a.id === action.data.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    default:
      return store
  }
}

export const creation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      newAnecdote
    })
  }
}

export const voting = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer