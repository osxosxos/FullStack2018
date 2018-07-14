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
  return {
    type: 'CREATE',
    content
  }
}

export const voting = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export default reducer